import { Button, Typography, Checkbox, } from 'antd';
import { loginSchema, type LoginFormValues } from '../validation/loginSchema';
import { useForm } from 'react-hook-form';
import { useLoading, useLogin, } from '../hooks';
import { handleApiError } from '../utils/apiErrorHandler';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import { logo } from '../assets';
import { FormInput } from '../components';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
    const {mutate: loginMutate, isPending } = useLogin();
    const {isLoading, startLoading, stopLoading} = useLoading();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched',
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit = (values: LoginFormValues) => {
        try {
        startLoading();
        loginMutate(values, {
            onSuccess: () => {
                reset();
            },
            onError: (error) => {
                handleApiError(error, 'Login failed!');
            },
            onSettled: () => {
                stopLoading();
            },
        });
        } catch (error) {
            handleApiError(error, 'Login failed!');
            stopLoading();
        }
    };

    return (
        <div className="!bg-gray-50 !dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center px-4">
            {isLoading}
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

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                    {/* Username */}
                    <FormInput
                        label="Username"
                        name="username"
                        control={control}
                        error={errors.username?.message}
                    />

                    {/* Password */}
                    <FormInput
                        label="Password"
                        name="password"
                        control={control}
                        error={errors.password?.message}
                        type="password"
                    />

                    {/* Remember me + Forgot password */}
                    <div className="flex items-center justify-between mb-2">
                        <Checkbox>Remember me</Checkbox>
                        <a href="#" className="text-sm font-medium !text-pink-600 hover:underline dark:text-pink-500">
                            Forgot password?
                        </a>
                    </div>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className="w-full h-10 !bg-pink-600 hover:!bg-pink-700 text-white"
                        loading={isLoading}
                    >
                        {isPending  ? 'Loging in...' : 'Login'}
                    </Button>
                </form>

                <Text className="text-sm text-gray-500 dark:text-gray-400 block text-center mt-4">
                    Don't have an account?{' '}
                    <a href="/register" className="font-medium !text-pink-600 hover:underline dark:text-pink-500">
                        Sign up!
                    </a>
                </Text>
            </div>
        </div>
    );
};

export default LoginPage;
