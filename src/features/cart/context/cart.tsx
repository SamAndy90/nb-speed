'use client';
import { Product } from '@/features/product/types';
import { Cart, CartItem, CartProductVariant } from '@/features/shopify/types';
import { ProductFragment, SellingPlan } from '@/gql/storefront/graphql';
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    use,
    useContext,
    useMemo,
    useOptimistic,
    useState,
} from 'react';

export type CartContextType = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    cart: Cart | undefined;
    addCartItem: (
        variant: CartProductVariant,
        product: Product,
        sellingPlanId?: string
    ) => void;
    upgradeToSubscription: (
        merchandiseId: string,
        product: Product,
        sellingPlanId: string
    ) => void;
    updateCartItemPlan: (
        merchandiseId: string,
        product: Product,
        oldSellingPlanId: string | null | undefined,
        newSellingPlanId: string | null | undefined
    ) => void;
    updateCartItem: (
        merchandiseId: string,
        updateType: UpdateType,
        sellingPlanId?: string
    ) => void;
    addCode: (code: string) => void;
    removeCode: (code: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
function calculateItemCost(
    quantity: number,
    price: string,
    sellingPlan?: SellingPlan
): string {
    const discountPercentage =
        sellingPlan &&
        sellingPlan.priceAdjustments?.length > 0 &&
        sellingPlan.priceAdjustments[0]?.adjustmentValue?.__typename ===
            'SellingPlanPercentagePriceAdjustment'
            ? sellingPlan.priceAdjustments[0].adjustmentValue
                  .adjustmentPercentage
            : 0;

    const _price = Number(
        Number(price) * (1 - discountPercentage / 100)
    ).toFixed(2);
    return Number(Number(_price) * quantity).toString();
}

type UpdateType = 'plus' | 'minus' | 'delete';

type CartAction =
    | {
          type: 'UPDATE_ITEM';
          payload: {
              merchandiseId: string;
              updateType: UpdateType;
              sellingPlanId?: string;
          };
      }
    | {
          type: 'ADD_ITEM';
          payload: {
              variant: CartProductVariant;
              product: Product;
              sellingPlanId?: string;
          };
      }
    | {
          type: 'UPGRADE_TO_SUBSCRIPTION';
          payload: {
              merchandiseId: string;
              product: Product;
              sellingPlanId: string;
          };
      }
    | {
          type: 'UPDATE_CART_ITEM_PLAN';
          payload: {
              merchandiseId: string;
              product: Product;
              oldSellingPlanId: string | null | undefined;
              newSellingPlanId: string | null | undefined;
          };
      }
    | {
          type: 'ADD_CODE';
          payload: { code: string };
      }
    | {
          type: 'REMOVE_CODE';
          payload: { code: string };
      };

function calculateSellingPlan(product: Product, sellingPlanId?: string) {
    let _sellingPlan: any = undefined;
    product.sellingPlanGroups.nodes.forEach((group) => {
        group.sellingPlans.edges.forEach((edge) => {
            if (edge.node.id === sellingPlanId) {
                _sellingPlan = edge.node;
            }
        });
    });
    return _sellingPlan;
}

function updateCartTotals(
    lines: CartItem[]
): Pick<Cart, 'totalQuantity' | 'cost'> {
    const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = lines.reduce(
        (sum, item) => sum + Number(item.cost.totalAmount.amount),
        0
    );
    const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? 'USD';

    return {
        totalQuantity,
        cost: {
            subtotalAmount: { amount: totalAmount.toString(), currencyCode },
            totalAmount: { amount: totalAmount.toString(), currencyCode },
            totalTaxAmount: { amount: '0', currencyCode },
        },
    };
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
    const currentCart = state;
    if (!currentCart) throw new Error('Cart is undefined');

    switch (action.type) {
        case 'UPDATE_ITEM': {
            const { merchandiseId, updateType, sellingPlanId } = action.payload;
            const updatedLines = currentCart.lines
                .map((item) => {
                    if (sellingPlanId) {
                        if (
                            item.merchandise.id === merchandiseId &&
                            item.sellingPlanAllocation?.sellingPlan?.id ===
                                sellingPlanId
                        ) {
                            return updateCartItem(item, updateType);
                        }
                    } else {
                        if (
                            item.merchandise.id === merchandiseId &&
                            !item.sellingPlanAllocation
                        ) {
                            return updateCartItem(item, updateType);
                        }
                    }
                    return item;
                })
                .filter(Boolean) as CartItem[];

            if (updatedLines.length === 0) {
                return {
                    ...currentCart,
                    lines: [],
                    totalQuantity: 0,
                    cost: {
                        ...currentCart.cost,
                        totalAmount: {
                            ...currentCart.cost.totalAmount,
                            amount: '0',
                        },
                    },
                };
            }

            return {
                ...currentCart,
                ...updateCartTotals(updatedLines),
                lines: updatedLines,
            };
        }
        case 'ADD_ITEM': {
            const { variant, product, sellingPlanId } = action.payload;
            const existingItem = currentCart.lines.find((item) => {
                if (sellingPlanId) {
                    return (
                        item.merchandise.id === variant.id &&
                        item.sellingPlanAllocation?.sellingPlan?.id ===
                            sellingPlanId
                    );
                }
                return (
                    item.merchandise.id === variant.id &&
                    !item.sellingPlanAllocation
                );
            });

            const updatedItem = createOrUpdateCartItem(
                existingItem,
                variant,
                product,
                sellingPlanId
            );

            const updatedLines = existingItem
                ? currentCart.lines.map((item) => {
                      if (sellingPlanId) {
                          if (
                              item.merchandise.id === variant.id &&
                              item.sellingPlanAllocation?.sellingPlan?.id ===
                                  sellingPlanId
                          ) {
                              return updatedItem;
                          }
                      } else {
                          if (
                              item.merchandise.id === variant.id &&
                              !item.sellingPlanAllocation
                          ) {
                              return updatedItem;
                          }
                      }
                      return item;
                  })
                : [updatedItem, ...currentCart.lines];

            return {
                ...currentCart,
                ...updateCartTotals(updatedLines),
                lines: updatedLines,
            };
        }
        case 'UPGRADE_TO_SUBSCRIPTION': {
            const { merchandiseId, product, sellingPlanId } = action.payload;
            const noSubscriptionLine = currentCart.lines.find((item) => {
                return (
                    item.merchandise.id === merchandiseId &&
                    !item.sellingPlanAllocation
                );
            });
            const existSubscriptionLine = currentCart.lines.find((item) => {
                return (
                    item.merchandise.id === merchandiseId &&
                    item.sellingPlanAllocation?.sellingPlan?.id ===
                        sellingPlanId
                );
            });
            const totalAmount = noSubscriptionLine!.cost.totalAmount;
            const sellingPlan = calculateSellingPlan(product, sellingPlanId);

            const totalAmountWithSellingPlan = calculateItemCost(
                noSubscriptionLine!.quantity,
                (
                    Number(totalAmount.amount) /
                    Number(noSubscriptionLine!.quantity)
                ).toString(),
                sellingPlan
            );

            let updatedLines: any[] = [];
            if (existSubscriptionLine) {
                updatedLines = currentCart.lines
                    .filter(
                        (item) =>
                            item.merchandise.id !== merchandiseId ||
                            (item.merchandise.id === merchandiseId &&
                                item.sellingPlanAllocation)
                    )
                    .map((item) => {
                        if (
                            item.merchandise.id === merchandiseId &&
                            item.sellingPlanAllocation?.sellingPlan?.id ===
                                sellingPlanId
                        ) {
                            return {
                                ...item,
                                quantity:
                                    item.quantity +
                                    noSubscriptionLine!.quantity,
                                cost: {
                                    ...item.cost,
                                    totalAmount: {
                                        ...item.cost.totalAmount,
                                        amount: (
                                            Number(
                                                item.cost.totalAmount.amount
                                            ) +
                                            Number(totalAmountWithSellingPlan)
                                        ).toString(),
                                    },
                                },
                            };
                        }
                        return item;
                    });
            } else {
                updatedLines = [
                    ...currentCart.lines.filter(
                        (item) =>
                            item.merchandise.id !== merchandiseId ||
                            (item.merchandise.id === merchandiseId &&
                                item.sellingPlanAllocation)
                    ),
                    {
                        ...noSubscriptionLine,
                        sellingPlanAllocation: { sellingPlan },
                        quantity: noSubscriptionLine!.quantity,
                        cost: {
                            ...noSubscriptionLine!.cost,
                            totalAmount: {
                                ...noSubscriptionLine!.cost.totalAmount,
                                amount: totalAmountWithSellingPlan,
                            },
                        },
                    },
                ];
            }

            return {
                ...currentCart,
                ...updateCartTotals(updatedLines),
                lines: updatedLines,
            };
        }
        case 'UPDATE_CART_ITEM_PLAN': {
            const {
                merchandiseId,
                product,
                oldSellingPlanId,
                newSellingPlanId,
            } = action.payload;
            const variant = product.variants.find(
                (variant) => variant.id === merchandiseId
            );
            if (!variant) {
                return currentCart;
            }

            const oldSubscriptionLine = currentCart.lines.find((item) => {
                return (
                    item.merchandise.id === merchandiseId &&
                    (oldSellingPlanId
                        ? item.sellingPlanAllocation?.sellingPlan?.id ===
                          oldSellingPlanId
                        : !Boolean(item.sellingPlanAllocation))
                );
            });
            const existSubscriptionLine = currentCart.lines.find((item) => {
                return (
                    item.merchandise.id === merchandiseId &&
                    (newSellingPlanId
                        ? item.sellingPlanAllocation?.sellingPlan?.id ===
                          newSellingPlanId
                        : !Boolean(item.sellingPlanAllocation))
                );
            });

            const sellingPlan = newSellingPlanId
                ? calculateSellingPlan(product, newSellingPlanId)
                : null;

            const totalAmountWithSellingPlan = calculateItemCost(
                oldSubscriptionLine!.quantity,
                variant.price.amount,
                sellingPlan
            );

            let updatedLines: any[] = [];
            if (existSubscriptionLine) {
                updatedLines = currentCart.lines
                    .filter(
                        (item) =>
                            item.merchandise.id !== merchandiseId ||
                            (item.merchandise.id === merchandiseId &&
                                (oldSellingPlanId
                                    ? item.sellingPlanAllocation?.sellingPlan
                                          ?.id !== oldSellingPlanId
                                    : !Boolean(item.sellingPlanAllocation)))
                    )
                    .map((item) => {
                        if (
                            item.merchandise.id === merchandiseId &&
                            (newSellingPlanId
                                ? item.sellingPlanAllocation?.sellingPlan
                                      ?.id === newSellingPlanId
                                : !Boolean(item.sellingPlanAllocation))
                        ) {
                            return {
                                ...item,
                                quantity:
                                    item.quantity +
                                    oldSubscriptionLine!.quantity,
                                cost: {
                                    ...item.cost,
                                    totalAmount: {
                                        ...item.cost.totalAmount,
                                        amount: (
                                            Number(
                                                item.cost.totalAmount.amount
                                            ) +
                                            Number(totalAmountWithSellingPlan)
                                        ).toString(),
                                    },
                                },
                            };
                        }
                        return item;
                    });
            } else {
                updatedLines = [
                    ...currentCart.lines.filter(
                        (item) =>
                            item.merchandise.id !== merchandiseId ||
                            (item.merchandise.id === merchandiseId &&
                                (oldSellingPlanId
                                    ? item.sellingPlanAllocation?.sellingPlan
                                          ?.id !== oldSellingPlanId
                                    : !Boolean(item.sellingPlanAllocation)))
                    ),
                    {
                        ...oldSubscriptionLine,
                        sellingPlanAllocation: { sellingPlan },
                        quantity: oldSubscriptionLine!.quantity,
                        cost: {
                            ...oldSubscriptionLine!.cost,
                            totalAmount: {
                                ...oldSubscriptionLine!.cost.totalAmount,
                                amount: totalAmountWithSellingPlan,
                            },
                        },
                    },
                ];
            }

            return {
                ...currentCart,
                ...updateCartTotals(updatedLines),
                lines: updatedLines,
            };
        }
        case 'ADD_CODE':
            return {
                ...currentCart,
                discountCodes: [
                    ...currentCart.discountCodes.filter(
                        ({ code }) => code !== action.payload.code
                    ),
                    { code: action.payload.code, applicable: true },
                ],
            };
        case 'REMOVE_CODE':
            return {
                ...currentCart,
                discountCodes: currentCart.discountCodes.filter(
                    (code) => code.code !== action.payload.code
                ),
            };
        default:
            return currentCart;
    }
}

function updateCartItem(
    item: CartItem,
    updateType: UpdateType
): CartItem | null {
    if (updateType === 'delete') return null;

    const newQuantity =
        updateType === 'plus' ? item.quantity + 1 : item.quantity - 1;
    if (newQuantity === 0) return null;

    const singleItemAmount =
        Number(item.cost.totalAmount.amount) / item.quantity;
    const newTotalAmount = calculateItemCost(
        newQuantity,
        singleItemAmount.toString()
    );

    return {
        ...item,
        quantity: newQuantity,
        cost: {
            ...item.cost,
            totalAmount: {
                ...item.cost.totalAmount,
                amount: newTotalAmount,
            },
        },
    };
}
function createOrUpdateCartItem(
    existingItem: CartItem | undefined,
    variant: CartProductVariant,
    product: Product,
    sellingPlanId?: string
): CartItem {
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    const sellingPlan = calculateSellingPlan(product, sellingPlanId);
    const totalAmount = calculateItemCost(
        quantity,
        variant.price.amount,
        sellingPlan
    );

    return {
        ...(existingItem && existingItem),
        attributes: [],
        id: existingItem?.id ?? '',
        quantity,
        cost: {
            totalAmount: {
                amount: totalAmount,
                currencyCode: variant.price.currencyCode,
            },
        },
        merchandise: {
            ...variant,
            product: { ...product },
        },
        ...(sellingPlan && { sellingPlanAllocation: { sellingPlan } }),
    };
}

/**
 * Cart context provider. Manages cart state and provides methods to update it, with optimistic updates.
 */
export function CartContextProvider({
    children,
    cartPromise,
}: { cartPromise: Promise<Cart | undefined> } & PropsWithChildren) {
    const initialCart = use(cartPromise);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [optimisticCart, updateOptimisticCart] = useOptimistic(
        initialCart,
        cartReducer
    );

    const updateCartItem = (
        merchandiseId: string,
        updateType: UpdateType,
        sellingPlanId?: string
    ) => {
        updateOptimisticCart({
            type: 'UPDATE_ITEM',
            payload: { merchandiseId, updateType, sellingPlanId },
        });
    };

    const addCartItem = (
        variant: CartProductVariant,
        product: Product,
        sellingPlanId?: string
    ) => {
        updateOptimisticCart({
            type: 'ADD_ITEM',
            payload: { variant, product, sellingPlanId },
        });
    };
    const upgradeToSubscription = (
        merchandiseId: string,
        product: Product,
        sellingPlanId: string
    ) => {
        updateOptimisticCart({
            type: 'UPGRADE_TO_SUBSCRIPTION',
            payload: { merchandiseId, product, sellingPlanId },
        });
    };
    const updateCartItemPlan = (
        merchandiseId: string,
        product: Product,
        oldSellingPlanId: string | null | undefined,
        newSellingPlanId: string | null | undefined
    ) => {
        updateOptimisticCart({
            type: 'UPDATE_CART_ITEM_PLAN',
            payload: {
                merchandiseId,
                product,
                oldSellingPlanId,
                newSellingPlanId,
            },
        });
    };
    const addCode = (code: string) => {
        updateOptimisticCart({ type: 'ADD_CODE', payload: { code } });
    };

    const removeCode = (code: string) => {
        updateOptimisticCart({ type: 'REMOVE_CODE', payload: { code } });
    };

    const value = useMemo(
        () => ({
            isOpen,
            setIsOpen,
            cart: optimisticCart,
            updateCartItem,
            addCartItem,
            upgradeToSubscription,
            addCode,
            updateCartItemPlan,
            removeCode,
        }),
        [isOpen, setIsOpen, optimisticCart]
    );
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}

/**
 * Hook to access the cart context. Must be used within a CartContextProvider.
 */
export function useCart() {
    const cartContext = useContext(CartContext);
    if (!cartContext) {
        throw new Error('useCart must be used within a CartContextProvider');
    }

    return cartContext;
}
