import { Button, Typography,  } from 'antd';

import React from 'react';
import { logo } from '../assets';
import { registerSchema, type RegisterFormValues } from '../validation/registerSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import { FormInput } from '../components';
import { useRegister } from '../hooks/useAuth';
import { handleApiError } from '../utils/apiErrorHandler';

const LoginPage: React.FC = () => {

    const { Title, Text } = Typography;
    const { mutate: register, isPending  } = useRegister();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterFormValues) => {
        register(data, {
        onSuccess: () => {
            console.log('Register success!');
        },
        onError: (error) => {
            handleApiError(error, 'Registration failed!');
        },
        });
    };

    return (
        <div className="!bg-gray-50 !dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center px-4">

            {/* Logo and Title */}
            <div className="flex items-center justify-center gap-2 mb-6">
                <img src={logo} alt="logo" className="w-9 h-9 object-contain"/>
                <Title className="text-gray-900 dark:text-black text-3xl font-medium !m-0">
                    Lotus
                </Title>
            </div>
            <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:border-gray-00 p-8">  
                <Title level={4} className="text-center !text-gray-900 dark:text-white mb-6 !font-bold">
                    Sign in to your account
                </Title>

                {/* Form */}
                {/* <RegisterFormValues> */}
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                    <FormInput
                        label="Username"
                        name="username"
                        control={control}
                        error={errors.username?.message}
                    />

                    <FormInput
                        label="Email"
                        name="email"
                        control={control}
                        error={errors.email?.message}
                    />

                    <FormInput
                        label="Password"
                        name="password"
                        control={control}
                        error={errors.password?.message}
                        type="password"
                    />

                    <FormInput
                        label="Confirm Password"
                        name="confirmPassword"
                        control={control}
                        error={errors.confirmPassword?.message}
                        type="password"
                    />

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className="w-full h-10 !bg-pink-600 hover:!bg-pink-700 text-white font-normal"
                    >
                        {isPending  ? 'Registering...' : 'Register'}
                    </Button>
                    </form>

                <Text className="text-sm text-gray-500 dark:text-gray-400 block text-center mt-4">
                        You have an account?{' '}
                        <a href="/login" className="font-medium !text-pink-600 hover:underline dark:text-pink-500">
                        Sign in!</a>
                </Text>
            </div>
        </div>
    );
};

export default LoginPage;
