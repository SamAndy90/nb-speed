'use client';

import Container from '@/components/container';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useEffect, useState } from 'react';

// import FemaleIcon from './static/icons/female.svg';
// import MaleIcon from './static/icons/male.svg';
import { BsGenderMale } from 'react-icons/bs';
import { BsGenderFemale } from 'react-icons/bs';

// import NonBinaryIcon from './static/icons/non-binary.svg';
import { AnimatePresence } from 'framer-motion';
import { QContent } from './QContent';
import { Progress } from './progress';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { ProductRatingBatch } from '@/lib/reviews/types';
import { Product } from '@/features/product/types';

import RestartIcon from './static/icons/restart.svg';
import { cn } from '@/lib/utils';
import { ProductsList } from './ProductsList';
import { MotionButton } from '@/components/motion-components/MotionButton';

export type QOption = {
    value: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
};

export type Steps = {
    title: string;
    options: QOption[];
};

const step_one: Steps = {
    title: 'Who is this for?',
    options: [
        {
            value: 'adults',
            label: 'Myself',
        },
        {
            value: 'kids',
            label: 'My child',
        },
    ],
};
const myself: Steps = {
    title: 'Are you?',
    options: [
        {
            value: 'female',
            label: 'Female',
            icon: <BsGenderFemale className={'rotate-180'} />,
        },
        { value: 'male', label: 'Male', icon: <BsGenderMale /> },
    ],
};
const child: Steps = {
    title: 'How old is your child?',
    options: [
        {
            value: '4-12',
            label: '4-12 years',
        },
        { value: '12+', label: '12+' },
    ],
};

const step_two_adults: Steps = {
    title: 'How are you feeling today? (Main Health Goal)',
    options: [
        {
            value: 'tired_empty',
            label: 'Tired & running on empty',
        },
        {
            value: 'run_down',
            label: 'Feeling run-down',
        },
        {
            value: 'stressed_overwhelmed',
            label: 'Stressed or overwhelmed',
        },
        {
            value: 'achy_joints',
            label: 'Achy or stiff joints',
        },
        {
            value: 'bloated_digestion',
            label: 'Bloated or sluggish digestion',
        },
        {
            value: 'skin_hair_nails',
            label: 'My skin, hair, or nails need some love',
        },
        {
            value: 'general_health',
            label: 'General health & wellness',
        },
    ],
};
const step_two_kids: Steps = {
    title: 'Main Health Goal',
    options: [
        {
            value: 'immunity_health',
            label: 'Immunity & Staying Healthy',
            description:
                'My child often gets colds, seems low on energy, or I want to support their immune system.',
        },
        {
            value: 'energy_focus',
            label: 'Energy & Focus',
            description:
                'My child struggles with tiredness, staying alert, or keeping up with daily activities.',
        },
        {
            value: 'bones_teeth',
            label: 'Strong Bones & Teeth',
            description:
                'I want to ensure my child gets enough calcium and Vitamin D for strong, healthy growth.',
        },
        {
            value: 'growth_development',
            label: 'Overall Growth & Development',
            description:
                'I want my child to get all the essential nutrients they need to grow and stay healthy.',
        },
        {
            value: 'learning_sharpness',
            label: 'Learning & Mental Sharpness',
            description:
                'I want to support my child’s ability to stay focused, engaged, and process information effectively.',
        },
    ],
};

const step_three: Steps = {
    title: 'What’s most important to you?',
    options: [
        {
            value: 'advanced',
            label: 'I want noticeable results quickly',
        },
        {
            value: 'daily',
            label: 'I’m happy with gradual improvements over time',
        },
    ],
};

const products: Record<string, Record<string, any>> = {
    adults: {
        tired_empty: {
            advanced: [
                'womens-multivitamin-sugar-free-vegan-gummies',
                'mens-multivitamin-sugar-free-vegan-gummies',
                'nutrigreens',
            ],
            daily: ['optimum-c', 'totalcare-plus-multivitamin', 'greenvita'],
        },
        run_down: {
            advanced: [
                'triple-immunity-sugar-free-vegan-gummies',
                'vitamin-d3-k2-sugar-free-vegan-gummies',
            ],
            daily: ['optimum-c', 'ultra-d1000', 'totalcare-plus-multivitamin'],
        },
        stressed_overwhelmed: {
            advanced: [
                'ashwagandha-ksm-66-sugar-free-vegan-gummies',
                'zenflow',
            ],
            daily: ['fembalance'],
        },
        achy_joints: {
            advanced: [
                'turmeric-sugar-free-vegan-gummies',
                'vitamin-d3-k2-sugar-free-vegan-gummies',
            ],
            daily: ['ultra-d1000'],
        },
        bloated_digestion: {
            advanced: ['nutrigreens'],
            daily: ['greenvita'],
        },
        skin_hair_nails: {
            advanced: ['hair-skin-nails-sugar-free-vegan-gummies'],
            daily: ['biotin-powerplus', 'trueradiance'],
        },
        general_health: {
            advanced: [
                'health-vitality-multivitamin-sugar-free-vegan-gummies',
                'mens-multivitamin-sugar-free-vegan-gummies',
                'womens-multivitamin-sugar-free-vegan-gummies',
            ],
            daily: ['totalcare-plus-multivitamin'],
        },
    },
    kids: {
        immunity_health: ['defence-dynamo-immunity-support', 'defencedynamo'],
        energy_focus: ['mega-multi-multivitamin', 'superkidz'],
        bones_teeth: ['mighty-bones-calcium-vitamin-d3', 'mighty-bones'],
        growth_development: ['mega-multi-multivitamin', 'superkidz'],
        learning_sharpness: ['mega-multi-multivitamin', 'superkidz'],
    },
};

const steps = {
    step_one,
    myself,
    child,
    step_two_adults,
    step_two_kids,
    step_three,
};

export type Result = {
    target: string;
    gender: string;
    age: string;
    goal: string;
    importance: string;
};

type QuizProps = {
    data: Product[];
    ratings: ProductRatingBatch[];
};

export default function Quiz({ data, ratings }: QuizProps) {
    const [stepIndex, setStepIndex] = useState(0);
    const [stepsFlow, setStepsFlow] = useState<Steps[]>([steps.step_one]);
    const [selected, setSelected] = useState<QOption | null>(null);
    const [result, setResult] = useState<Result>({
        target: '',
        gender: '',
        age: '',
        goal: '',
        importance: '',
    });
    const [progress, setProgress] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const currentStep = stepsFlow[stepIndex];

    useEffect(() => {
        if (currentStep) setSelected(currentStep.options[0]);
    }, [currentStep]);

    useEffect(() => {
        const totalSteps = stepsFlow.length;
        const currentProgress = Math.floor((stepIndex / totalSteps) * 100);
        setProgress(currentProgress);
    }, [stepIndex, stepsFlow.length]);

    const handleContinue = () => {
        if (!selected) return;

        let updatedResult = { ...result };
        let nextSteps: Steps[] = [];

        switch (stepIndex) {
            case 0:
                updatedResult.target = selected.value;
                if (selected.value === 'adults') {
                    nextSteps = [
                        steps.step_one,
                        steps.myself,
                        steps.step_two_adults,
                        steps.step_three,
                    ];
                } else {
                    nextSteps = [
                        steps.step_one,
                        steps.child,
                        steps.step_two_kids,
                    ];
                }
                setStepsFlow(nextSteps);
                break;

            case 1:
                if (updatedResult.target === 'adults') {
                    updatedResult.gender = selected.value;
                } else {
                    updatedResult.age = selected.value;
                }
                break;

            case 2:
                updatedResult.goal = selected.value;
                if (updatedResult.target === 'kids') {
                    setIsFinished(true);
                    setResult(updatedResult);
                    return;
                }
                break;

            case 3:
                updatedResult.importance = selected.value;
                setIsFinished(true);
                break;
        }

        setResult(updatedResult);
        setStepIndex((prev) => prev + 1);
    };

    function handleBack() {
        if (stepIndex > 0) {
            setStepIndex((prev) => prev - 1);
        }
    }
    function handleRestart() {
        setStepIndex(0);
        setStepsFlow([steps.step_one]);
        setResult({
            target: '',
            gender: '',
            age: '',
            goal: '',
            importance: '',
        });
        setIsFinished(false);
    }

    let recommendedProductsHandles: string[] = [];
    if (isFinished) {
        if (result.target === 'adults') {
            recommendedProductsHandles =
                products.adults?.[result.goal]?.[result.importance] || [];
        } else if (result.target === 'kids') {
            recommendedProductsHandles = products.kids?.[result.goal] || [];
        }
    }

    const filteredProducts = data.filter((p) =>
        recommendedProductsHandles.includes(p.handle)
    );

    return (
        <section className={'overflow-hidden pb-24 pt-[45px] md:pt-[120px]'}>
            <Container>
                <div
                    className={cn(
                        'relative rounded-[20px] bg-beige px-5 pb-10 pt-[90px] md:pb-[115px] md:pt-40',
                        {
                            'lg:px-24 lg:py-[76px]': isFinished,
                        }
                    )}>
                    {!isFinished && !recommendedProductsHandles.length ? (
                        <div className={'flex flex-col items-center gap-y-2'}>
                            <div className={'mb-2 w-full max-w-[414px]'}>
                                <Progress value={progress} />
                            </div>
                            <div
                                className={
                                    'relative flex h-96 w-full justify-center after:absolute after:bottom-0 after:block after:h-10 after:w-full after:max-w-[414px] after:bg-gradient-to-t after:from-beige after:to-transparent'
                                }>
                                <div
                                    className={
                                        'flex w-full justify-center overflow-auto'
                                    }>
                                    <AnimatePresence mode={'wait'}>
                                        <QContent
                                            key={stepIndex}
                                            step={currentStep}
                                            progress={progress}
                                            selected={selected}
                                            setSelected={setSelected}
                                        />
                                    </AnimatePresence>
                                </div>
                            </div>
                            <MotionButton
                                className={'w-full max-w-[195px]'}
                                whileTap={{ scale: 0.95 }}
                                transition={{
                                    duration: 0.2,
                                    ease: 'linear',
                                    delay: 0,
                                }}
                                onClick={handleContinue}
                                disabled={!selected}>
                                OK
                            </MotionButton>
                        </div>
                    ) : (
                        <ProductsList
                            data={filteredProducts}
                            ratings={ratings}
                        />
                    )}
                    {!!stepIndex && !isFinished && (
                        <Button
                            variant="secondary"
                            onClick={handleBack}
                            className="absolute left-5 top-10 size-[34px] bg-gradient-2 p-0 hover:text-white disabled:opacity-50 md:left-[50px] md:top-[50px]"
                            aria-label="Previous slide">
                            <ChevronLeft size={16} />
                        </Button>
                    )}
                    {isFinished && (
                        <button
                            onClick={handleRestart}
                            className={
                                'group absolute right-5 top-5 flex items-center gap-x-3 text-paragraph-4 md:right-8 md:top-8'
                            }>
                            <RestartIcon
                                className={
                                    'transition-transform duration-300 group-hover:rotate-45'
                                }
                            />
                            <span
                                className={
                                    'underline-offset-2 transition-all group-hover:underline'
                                }>
                                Restart
                            </span>
                        </button>
                    )}
                </div>
            </Container>
        </section>
    );
}
