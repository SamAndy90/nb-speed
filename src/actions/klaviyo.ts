'use server';
import sgMail from '@sendgrid/mail';

export async function subscribeToNewsletter(
    prevState: any,
    formData: FormData
) {
    console.log('Previous state:', prevState);
    console.log('FormData received:', formData);

    const email = formData.get('email') as string;

    console.log('Email extracted:', email);

    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        return {
            success: false,
            error: 'Please enter a valid email address',
        };
    }

    const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_KEY;
    const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID;

    if (!KLAVIYO_API_KEY) {
        console.error('Klaviyo API key is not set');
        return {
            success: false,
            error: 'Server configuration error: Missing API key',
        };
    }

    if (!KLAVIYO_LIST_ID) {
        console.error('Klaviyo List ID is not set');
        return {
            success: false,
            error: 'Server configuration error: Missing List ID',
        };
    }

    try {
        const response = await fetch(
            'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/',
            {
                method: 'POST',
                headers: {
                    Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    revision: '2024-07-15',
                },
                body: JSON.stringify({
                    data: {
                        type: 'profile-subscription-bulk-create-job',
                        attributes: {
                            custom_source: 'Newsletter Signup',
                            historical_import: false,
                            profiles: {
                                data: [
                                    {
                                        type: 'profile',
                                        attributes: {
                                            email: email,
                                            subscriptions: {
                                                email: {
                                                    marketing: {
                                                        consent: 'SUBSCRIBED',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                        relationships: {
                            list: {
                                data: {
                                    type: 'list',
                                    id: KLAVIYO_LIST_ID,
                                },
                            },
                        },
                    },
                }),
            }
        );

        // Check if the response is OK (status in the range 200-299)
        if (!response.ok) {
            // Attempt to parse the response as JSON, but fall back to text if it fails
            let errorDetail;
            try {
                const errorData = await response.json();
                errorDetail =
                    errorData.errors?.[0]?.detail ||
                    `Subscription failed with status ${response.status}`;
            } catch (jsonError) {
                // If JSON parsing fails, log the raw response text
                const rawText = await response.text();
                console.error(
                    'Failed to parse error response as JSON. Raw response:',
                    rawText
                );
                errorDetail = `Subscription failed with status ${response.status}: Invalid response from server`;
            }
            console.error('Klaviyo subscription error:', errorDetail);
            throw new Error(errorDetail);
        }

        // For a 202 Accepted response, the body is expected to be empty
        if (response.status === 202) {
            // Check the content-length header to confirm the body is empty
            const contentLength = response.headers.get('content-length');
            if (contentLength === '0') {
                console.log(
                    'Klaviyo subscription job queued successfully (202 Accepted with empty body)'
                );
                return {
                    success: true,
                    message: 'Successfully subscribed!',
                };
            }
        }

        // If the response has a body, parse it as JSON
        const data = await response.json();

        if (data.errors) {
            console.error('Klaviyo subscription error:', data.errors[0].detail);
            return {
                success: false,
                error: data.errors[0].detail,
            };
        }

        console.log('Klaviyo subscription response:', data);

        return {
            success: true,
            message: 'Successfully subscribed!',
        };
    } catch (error) {
        console.error('Klaviyo subscription error:', error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : 'Something went wrong. Please try again later.',
        };
    }
}

export async function minionsRewardsSubmissiontoKlaviyo(formData: {
    email: string;
    firstName: string;
    surname: string;
    childrenCount: number;
    marketingAccepted: boolean;
    termsAccepted: boolean;
    contactOnWinAccepted: boolean;
    recieptBase64: string;
    recieptType: string;
}) {
    const fileExtension = {
        'image/png': '.png',
        'image/jpeg': '.jpg',
        'image/jpg': '.jpg',
        'application/pdf': '.pdf',
    };

    const email = formData.email;
    const firstName = formData.firstName;
    const surname = formData.surname;
    const childrenCount = formData.childrenCount;
    const marketingAccepted = formData.marketingAccepted;
    const termsAccepted = formData.termsAccepted;
    const contactOnWinAccepted = formData.contactOnWinAccepted;
    const recieptBase64 = formData.recieptBase64;
    const recieptType = formData.recieptType;
    const recieptFileName =
        formData.firstName +
        '_' +
        formData.surname +
        '_minions_receipt' +
        fileExtension[recieptType as keyof typeof fileExtension];

    const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_KEY;
    const KLAVIYO_MINIONS_LIST_ID =
        process.env.KLAVIYO_MINIONS_SUBMISSION_LIST_ID;
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const SENDGRID_SUBMISSION_FROM_EMAIL =
        process.env.SENDGRID_SUBMISSION_FROM_EMAIL;
    let SENDGRID_SUBMISSION_TO_EMAILS: string[] | string | undefined =
        process.env.SENDGRID_SUBMISSION_TO_EMAILS;

    if (!KLAVIYO_API_KEY) {
        console.error('Klaviyo API key is not set');
        return {
            success: false,
            serverError: true,
            error: 'Server configuration error: Missing API key',
        };
    }

    if (!KLAVIYO_MINIONS_LIST_ID) {
        console.error('Klaviyo List ID is not set');
        return {
            success: false,
            serverError: true,
            error: 'Server configuration error: Missing List ID',
        };
    }

    if (!SENDGRID_API_KEY) {
        console.error('SendGrid API key is not set');
        return {
            success: false,
            serverError: true,
            error: 'Server configuration error: Missing SendGrid API key',
        };
    }

    if (!SENDGRID_SUBMISSION_FROM_EMAIL) {
        console.error('SendGrid from email is not set');
        return {
            success: false,
            serverError: true,
            error: 'Server configuration error: Missing SendGrid from email',
        };
    }

    if (!SENDGRID_SUBMISSION_TO_EMAILS) {
        console.error('SendGrid to emails are not set');
        return {
            success: false,
            serverError: true,
            error: 'Server configuration error: Missing SendGrid to emails',
        };
    }

    SENDGRID_SUBMISSION_TO_EMAILS = SENDGRID_SUBMISSION_TO_EMAILS.split(
        ','
    ).map((email) => email.trim());

    try {
        const createProfileData = {
            data: {
                type: 'profile',
                attributes: {
                    email: email,
                    first_name: firstName,
                    last_name: surname,
                    properties: {
                        children_count: childrenCount,
                        marketing_accepted: marketingAccepted,
                        terms_accepted: termsAccepted,
                        contact_on_win_accepted: contactOnWinAccepted,
                    },
                },
            },
        };

        const createProfileResponse = await fetch(
            'https://a.klaviyo.com/api/profile-import',
            {
                method: 'POST',
                headers: {
                    accept: 'application/vnd.api+json',
                    revision: '2025-04-15',
                    'content-type': 'application/vnd.api+json',
                    Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
                },
                body: JSON.stringify(createProfileData),
            }
        );

        const createProfileResponseBody = await createProfileResponse.json();

        if (
            !createProfileResponseBody?.data?.id &&
            createProfileResponseBody.errors &&
            !(
                createProfileResponseBody.errors[0].code == 'duplicate_profile'
            ) &&
            !createProfileResponseBody.errors[0].meta.duplicate_profile_id
        ) {
            console.error(
                'Klaviyo profile creation failed with status ' +
                    createProfileResponse.status +
                    ' and error: ' +
                    JSON.stringify(createProfileResponseBody.errors[0], null, 2)
            );
            throw new Error(
                'Klaviyo profile creation failed with status ' +
                    createProfileResponse.status
            );
        }

        const profileId = createProfileResponseBody.data
            ? createProfileResponseBody.data.id
            : createProfileResponseBody.errors[0].meta.duplicate_profile_id;
        const addToMinionsListData = {
            data: [
                {
                    type: 'profile',
                    id: profileId,
                },
            ],
        };

        const addToMinionsListResponse = await fetch(
            `https://a.klaviyo.com/api/lists/${KLAVIYO_MINIONS_LIST_ID}/relationships/profiles`,
            {
                method: 'POST',
                headers: {
                    accept: 'application/vnd.api+json',
                    revision: '2025-04-15',
                    'content-type': 'application/vnd.api+json',
                    Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
                },
                body: JSON.stringify(addToMinionsListData),
            }
        );

        sgMail.setApiKey(SENDGRID_API_KEY);

        const attachment = {
            content: recieptBase64,
            filename: recieptFileName,
            type: recieptType,
            disposition: 'attachment',
        };

        // Create email message
        const msg = {
            to: SENDGRID_SUBMISSION_TO_EMAILS[0],
            cc: SENDGRID_SUBMISSION_TO_EMAILS.slice(1),
            from: SENDGRID_SUBMISSION_FROM_EMAIL,
            subject: `New Minions Submission Received`,
            text: `A new Minions Rewards submission has been received from ${firstName} ${surname}. Profile ID: ${profileId}. Status - Profile creation: ${createProfileResponse.status}, Add to list: ${addToMinionsListResponse.status}. See attached receipt.`,
            html: `
                <h1>New Minions Submission</h1>
                <p>A submission has been received from <strong>${firstName} ${surname}</strong> for the Minions Rewards program.</p>
                <p><strong>Profile ID:</strong> ${profileId}</p>
                <p><strong>Status Codes:</strong></p>
                <ul>
                    <li>Profile Creation: ${createProfileResponse.status}</li>
                    <li>Add to Minions List: ${addToMinionsListResponse.status}</li>
                </ul>
                <p>The receipt is attached to this email.</p>
            `,
            attachments: [attachment],
        };

        // Send the email
        await sgMail.send(msg);

        if (addToMinionsListResponse.status == 204) {
            return {
                success: true,
                message: 'Successfully submitted!',
            };
        }

        const addToMinionsListResponseBody =
            await addToMinionsListResponse.json();

        if (addToMinionsListResponseBody.errors) {
            console.error(
                'Klaviyo submission error:',
                addToMinionsListResponseBody.errors[0].detail
            );
            return {
                success: false,
                error: addToMinionsListResponseBody.errors[0].detail,
            };
        }

        return {
            success: false,
            message: 'Failed to submit to Klaviyo!',
        };
    } catch (error) {
        console.error('Klaviyo submission error:', error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : 'Something went wrong. Please try again later.',
        };
    }
}

export async function spondDiscountSubmissiontoKlaviyo(formData: {
    email: string;
}) {
    const email = formData.email;

    const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_KEY;
    const KLAVIYO_SPOND_DISCOUNT_LIST_ID =
        process.env.KLAVIYO_SPOND_DISCOUNT_LIST_ID;
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const SENDGRID_SUBMISSION_FROM_EMAIL =
        process.env.SENDGRID_SUBMISSION_FROM_EMAIL;
    let SENDGRID_SUBMISSION_TO_EMAILS: string[] | string | undefined =
        process.env.SENDGRID_SUBMISSION_TO_EMAILS;

    if (!KLAVIYO_API_KEY) {
        console.error('Klaviyo API key is not set');
        return {
            success: false,
            serverError: true,
            error: 'Server configuration error: Missing API key',
        };
    }

    if (!KLAVIYO_SPOND_DISCOUNT_LIST_ID) {
        console.error('Klaviyo List ID is not set');
        return {
            success: false,
            serverError: true,
            error: 'Server configuration error: Missing List ID',
        };
    }

    if (!SENDGRID_API_KEY) {
        console.error('SendGrid API key is not set');
        return {
            success: false,
            serverError: true,
            error: 'Server configuration error: Missing SendGrid API key',
        };
    }

    if (!SENDGRID_SUBMISSION_FROM_EMAIL) {
        console.error('SendGrid from email is not set');
        return {
            success: false,
            serverError: true,
            error: 'Server configuration error: Missing SendGrid from email',
        };
    }

    if (!SENDGRID_SUBMISSION_TO_EMAILS) {
        console.error('SendGrid to emails are not set');
        return {
            success: false,
            serverError: true,
            error: 'Server configuration error: Missing SendGrid to emails',
        };
    }

    SENDGRID_SUBMISSION_TO_EMAILS = SENDGRID_SUBMISSION_TO_EMAILS.split(
        ','
    ).map((email) => email.trim());

    try {
        const createProfileData = {
            data: {
                type: 'profile',
                attributes: {
                    email: email,
                },
            },
        };

        const createProfileResponse = await fetch(
            'https://a.klaviyo.com/api/profile-import',
            {
                method: 'POST',
                headers: {
                    accept: 'application/vnd.api+json',
                    revision: '2025-04-15',
                    'content-type': 'application/vnd.api+json',
                    Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
                },
                body: JSON.stringify(createProfileData),
            }
        );

        const createProfileResponseBody = await createProfileResponse.json();

        if (
            !createProfileResponseBody?.data?.id &&
            createProfileResponseBody.errors &&
            !(
                createProfileResponseBody.errors[0].code == 'duplicate_profile'
            ) &&
            !createProfileResponseBody.errors[0].meta.duplicate_profile_id
        ) {
            console.error(
                'Klaviyo profile creation failed with status ' +
                    createProfileResponse.status +
                    ' and error: ' +
                    JSON.stringify(createProfileResponseBody.errors[0], null, 2)
            );
            throw new Error(
                'Klaviyo profile creation failed with status ' +
                    createProfileResponse.status
            );
        }

        const profileId = createProfileResponseBody.data
            ? createProfileResponseBody.data.id
            : createProfileResponseBody.errors[0].meta.duplicate_profile_id;
        const addToSpondDiscountListData = {
            data: [
                {
                    type: 'profile',
                    id: profileId,
                },
            ],
        };

        const addToSpondDiscountListResponse = await fetch(
            `https://a.klaviyo.com/api/lists/${KLAVIYO_SPOND_DISCOUNT_LIST_ID}/relationships/profiles`,
            {
                method: 'POST',
                headers: {
                    accept: 'application/vnd.api+json',
                    revision: '2025-04-15',
                    'content-type': 'application/vnd.api+json',
                    Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
                },
                body: JSON.stringify(addToSpondDiscountListData),
            }
        );

        sgMail.setApiKey(SENDGRID_API_KEY);

        // Create email message
        const msg = {
            to: SENDGRID_SUBMISSION_TO_EMAILS[0],
            cc: SENDGRID_SUBMISSION_TO_EMAILS.slice(1),
            from: SENDGRID_SUBMISSION_FROM_EMAIL,
            subject: `New Spond Discount Submission Received`,
            text: `A new Spond Discount submission has been received from ${email}. Profile ID: ${profileId}. Status - Profile creation: ${createProfileResponse.status}, Add to list: ${addToSpondDiscountListResponse.status}.`,
            html: `
                <h1>New Spond Discount Submission</h1>
                <p>A submission has been received from <strong>${email}</strong> for the Spond Discount program.</p>
                <p><strong>Profile ID:</strong> ${profileId}</p>
                <p><strong>Status Codes:</strong></p>
                <ul>
                    <li>Profile Creation: ${createProfileResponse.status}</li>
                    <li>Add to Spond Discount List: ${addToSpondDiscountListResponse.status}</li>
                </ul>
            `,
        };

        // Send the email
        await sgMail.send(msg);

        if (addToSpondDiscountListResponse.status == 204) {
            return {
                success: true,
                message: 'Successfully submitted!',
            };
        }

        const addToSpondDiscountListResponseBody =
            await addToSpondDiscountListResponse.json();

        if (addToSpondDiscountListResponseBody.errors) {
            console.error(
                'Klaviyo submission error:',
                addToSpondDiscountListResponseBody.errors[0].detail
            );
            return {
                success: false,
                error: addToSpondDiscountListResponseBody.errors[0].detail,
            };
        }

        return {
            success: false,
            message: 'Failed to submit to Klaviyo!',
        };
    } catch (error) {
        console.error('Klaviyo submission error:', error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : 'Something went wrong. Please try again later.',
        };
    }
}

export async function allergyDiscountSubmissiontoKlaviyo(formData: {
    email: string;
    discountOption: string;
}) {
    const email = formData.email;
    const discountOption = formData.discountOption;

    const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_KEY;
    const KLAVIYO_ALLERGY_DISCOUNT_LIST_ID =
        process.env.KLAVIYO_ALLERGY_DISCOUNT_LIST_ID;
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const SENDGRID_SUBMISSION_FROM_EMAIL =
        process.env.SENDGRID_SUBMISSION_FROM_EMAIL;
    let SENDGRID_SUBMISSION_TO_EMAILS: string[] | string | undefined =
        process.env.SENDGRID_SUBMISSION_TO_EMAILS;

    if (!KLAVIYO_API_KEY) {
        console.error('Klaviyo API key is not set');
        return {
            success: false,
            serverError: true,
            error: 'Server configuration error: Missing API key',
        };
    }

    if (!KLAVIYO_ALLERGY_DISCOUNT_LIST_ID) {
        console.error('Klaviyo List ID is not set');
        return {
            success: false,
            serverError: true,
            error: 'Server configuration error: Missing List ID',
        };
    }

    if (!SENDGRID_API_KEY) {
        console.error('SendGrid API key is not set');
        return {
            success: false,
            serverError: true,
            error: 'Server configuration error: Missing SendGrid API key',
        };
    }

    if (!SENDGRID_SUBMISSION_FROM_EMAIL) {
        console.error('SendGrid from email is not set');
        return {
            success: false,
            serverError: true,
            error: 'Server configuration error: Missing SendGrid from email',
        };
    }

    if (!SENDGRID_SUBMISSION_TO_EMAILS) {
        console.error('SendGrid to emails are not set');
        return {
            success: false,
            serverError: true,
            error: 'Server configuration error: Missing SendGrid to emails',
        };
    }

    SENDGRID_SUBMISSION_TO_EMAILS = SENDGRID_SUBMISSION_TO_EMAILS.split(
        ','
    ).map((email) => email.trim());

    try {
        const createProfileData = {
            data: {
                type: 'profile',
                attributes: {
                    email: email,
                    properties: {
                        discount_option: discountOption,
                    },
                },
            },
        };

        const createProfileResponse = await fetch(
            'https://a.klaviyo.com/api/profile-import',
            {
                method: 'POST',
                headers: {
                    accept: 'application/vnd.api+json',
                    revision: '2025-04-15',
                    'content-type': 'application/vnd.api+json',
                    Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
                },
                body: JSON.stringify(createProfileData),
            }
        );

        const createProfileResponseBody = await createProfileResponse.json();

        if (
            !createProfileResponseBody?.data?.id &&
            createProfileResponseBody.errors &&
            !(
                createProfileResponseBody.errors[0].code == 'duplicate_profile'
            ) &&
            !createProfileResponseBody.errors[0].meta.duplicate_profile_id
        ) {
            console.error(
                'Klaviyo profile creation failed with status ' +
                    createProfileResponse.status +
                    ' and error: ' +
                    JSON.stringify(createProfileResponseBody.errors[0], null, 2)
            );
            throw new Error(
                'Klaviyo profile creation failed with status ' +
                    createProfileResponse.status
            );
        }

        const profileId = createProfileResponseBody.data
            ? createProfileResponseBody.data.id
            : createProfileResponseBody.errors[0].meta.duplicate_profile_id;
        const addToAllergyDiscountListData = {
            data: [
                {
                    type: 'profile',
                    id: profileId,
                },
            ],
        };

        const addToAllergyDiscountListResponse = await fetch(
            `https://a.klaviyo.com/api/lists/${KLAVIYO_ALLERGY_DISCOUNT_LIST_ID}/relationships/profiles`,
            {
                method: 'POST',
                headers: {
                    accept: 'application/vnd.api+json',
                    revision: '2025-04-15',
                    'content-type': 'application/vnd.api+json',
                    Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
                },
                body: JSON.stringify(addToAllergyDiscountListData),
            }
        );

        sgMail.setApiKey(SENDGRID_API_KEY);

        // Create email message
        const msg = {
            to: SENDGRID_SUBMISSION_TO_EMAILS[0],
            cc: SENDGRID_SUBMISSION_TO_EMAILS.slice(1),
            from: SENDGRID_SUBMISSION_FROM_EMAIL,
            subject: `New Allergy Discount Submission Received`,
            text: `A new Allergy Discount submission has been received from ${email}. Profile ID: ${profileId}. Status - Profile creation: ${createProfileResponse.status}, Add to list: ${addToAllergyDiscountListResponse.status}.`,
            html: `
                <h1>New Allergy Discount Submission</h1>
                <p>A submission has been received from <strong>${email}</strong> for the Allergy Discount program.</p>
                <p><strong>Discount Option Selected:</strong> ${discountOption}</p>
                <p><strong>Profile ID:</strong> ${profileId}</p>
                <p><strong>Status Codes:</strong></p>
                <ul>
                    <li>Profile Creation: ${createProfileResponse.status}</li>
                    <li>Add to Allergy Discount List: ${addToAllergyDiscountListResponse.status}</li>
                </ul>
            `,
        };

        // Send the email
        await sgMail.send(msg);

        if (addToAllergyDiscountListResponse.status == 204) {
            return {
                success: true,
                message: 'Successfully submitted!',
            };
        }

        const addToAllergyDiscountListResponseBody =
            await addToAllergyDiscountListResponse.json();

        if (addToAllergyDiscountListResponseBody.errors) {
            console.error(
                'Klaviyo submission error:',
                addToAllergyDiscountListResponseBody.errors[0].detail
            );
            return {
                success: false,
                error: addToAllergyDiscountListResponseBody.errors[0].detail,
            };
        }

        return {
            success: false,
            message: 'Failed to submit to Klaviyo!',
        };
    } catch (error) {
        console.error('Klaviyo submission error:', error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : 'Something went wrong. Please try again later.',
        };
    }
}
