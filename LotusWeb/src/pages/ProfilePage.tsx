import React, { useEffect, useRef, } from 'react';
import UserLayout from '../components/menu/UserLayout';
import { Button, Input, message, Select, Spin } from 'antd';
import { updateUserSchema, type UserUpdateFormValues } from '../validation/userSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import { useUpdateUser, useUserById } from '../hooks/useUser';
import { useLocation, useNavigate, } from 'react-router-dom';
import { CalendarOutlined, CameraOutlined, FileTextOutlined, MailOutlined, ManOutlined, PhoneOutlined, UploadOutlined, UserOutlined, } from "@ant-design/icons";
import FormField from '../components/form/FormField';
import { useAvatar, useBackground } from '../hooks/useUserImage';

const API_URL = import.meta.env.VITE_API_URL;

const ProfilePage: React.FC = () => {
  const id = localStorage.getItem('id');
  const updateMutation = useUpdateUser();
  // const [successOpen, setSuccessOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user: locationUser } = location.state || {};

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);

  const avatarMutation = useAvatar();
  const backgroundMutation = useBackground();

  const{
      control,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
    } = useForm<UserUpdateFormValues>({
      resolver: zodResolver(updateUserSchema),
      mode: 'onBlur', 
      defaultValues: {
        name: '',
        email: '',
        phone: '',
        gender: '',
        description: '',
      },
    });

  const {
      data: User,
      isLoading,
      isError,
    } = useUserById(Number(id), {
      enabled: !locationUser && !!id,
    });

  useEffect(() => {
    if(User) {
      reset(User);
    }
  }, [User, reset]);

  const onSubmit = async (values: UserUpdateFormValues) => {
    console.log("Submitting with data:", values);
    try {
      await updateMutation.mutateAsync({id: Number(id), data: values});

      // setSuccessOpen(true);
      message.success('Camera updated successfully!');
      
      navigate('/profile');
    } catch (error) {
      console.error(error);
      message.error('Update failed. Please try again.');
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file && id) {
      avatarMutation.mutate({ id: Number(id), file });
    }
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file && id) {
      backgroundMutation.mutate({ id: Number(id), file });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    message.error('User not found. Redirecting...');
    navigate('/profile');
    return null;
  }

  return (
    <UserLayout>
      <div className="p-6">
          <div className='relative'>
            {/* Background */}
            <div
              className="h-[500px] bg-gray-300 rounded-lg"
              style={{
                backgroundImage: User?.background 
                ?`url(${API_URL}${User.background}?t=${Date.now()})`
                : "",
                backgroundSize: "cover",
                backgroundPosition: "center",
                
              }}
            />
            <Button
              className="absolute top-2 right-2"
              icon={<UploadOutlined />}
              onClick={() => backgroundInputRef.current?.click()}
            >
              Đổi ảnh nền
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={backgroundInputRef}
              style={{ display: "none" }}
              onChange={handleBackgroundChange}
            />

            {/* Avatar */}
            <div className="absolute bottom-24 left-10 flex items-end gap-3 translate-y-1/2">
              <img
                src={User?.avatar 
                  ? `${API_URL}${User.avatar}?t=${Date.now()}`
                  : "https://placehold.co/600x400?text=Hello"}
                alt="Avatar"
                className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg"
              />
              <Button 
                icon={<CameraOutlined />}
                onClick={() => avatarInputRef.current?.click()}
              >
                Đổi ảnh đại diện
              </Button>
              <input
                type="file"
                accept="image/*"
                ref={avatarInputRef}
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          <div className="mt-5 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="mt-5 space-y-3 col-span-1 bg-white p-6 rounded-lg border-2 border-gray-300">
              <div>
                <span className="font-semibold flex items-center gap-2">
                  <UserOutlined /> Your name
                </span>
                <p className="mt-1 text-gray-900 px-3 py-2">{User?.name}</p>
              </div>
              <hr className="border-t-2 border-gray-300 my-4"/>

              <div>
                <span className="font-semibold flex items-center gap-2">
                  <MailOutlined /> Email
                </span>
                <p className="mt-1 text-gray-900 px-3 py-2">{User?.email}</p>
              </div>
              <hr className="border-t-2 border-gray-300 my-4"/>

              <div>
                <span className="font-semibold flex items-center gap-2">
                  <PhoneOutlined /> Số điện thoại
                </span>
                <p className="mt-1 text-gray-900 px-3 py-2">{User?.phone || ''}</p>
              </div>
              <hr className="border-t-2 border-gray-300 my-4"/>

              <div>
                <span className="font-semibold flex items-center gap-2">
                  <ManOutlined /> Giới tính
                </span>
                <p className="mt-1 text-gray-900 px-3 py-2">{User?.gender || ''}</p>
              </div>
              <hr className="border-t-2 border-gray-300 my-4"/>

              <div>
                <span className="font-semibold flex items-center gap-2">
                  <CalendarOutlined /> Ngày tham gia
                </span>
                <p className="mt-1 text-gray-900 px-3 py-2">{User?.joinedDate || ''}</p>
              </div>
              <hr className="border-t-2 border-gray-300 my-4"/>

              <div>
                <span className="font-semibold flex items-center gap-2">
                  <FileTextOutlined /> Mô tả
                </span>
                <p className="mt-1 text-gray-900 px-3 py-2">{User?.description || ''}</p>
              </div>
            </div>

            {/* Form update */}
            <div className="mt-5 bg-white p-6 rounded-lg border border-gray-200 col-span-2">
              <form
                onSubmit={handleSubmit(onSubmit)} 
                className="w-full gap-y-6 gap-x-14 items-start"
              >
                <FormField<UserUpdateFormValues, 'name'> name="name" label="Your name" control={control} errors={errors}
                inputNode={(props) => <Input {...props} placeholder="Your name" className="... h-10 mb-5" />} />

                <div className="mb-5">
                  <label className="block font-medium mb-1">Email</label>
                  <Input value={User?.email || ''} disabled className='h-10'/>
                </div>

                <FormField<UserUpdateFormValues, 'phone'> name="phone" label="Phone number" control={control} errors={errors}
                inputNode={(props) => <Input {...props} placeholder='Phone number' className="... h-10 mb-5" />} />

                <FormField<UserUpdateFormValues, 'gender'> name="gender" label="Gender" control={control} errors={errors}
                inputNode={(props) => (
                    <Select
                      {...props}
                      className="h-10 mb-5 w-full"
                      placeholder="Select gender"
                      options={[
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' }
                      ]}
                    />
                  )} 
                />     

                <div className="lg:col-span-2 mb-5">
                  <FormField<UserUpdateFormValues, 'description'> name="description" label="Describe yourself" control={control} errors={errors}
                  inputNode={(props) => <Input.TextArea {...props}/>} />
                </div>
              
                <Button 
                  htmlType="submit" 
                  type="primary" 
                  block
                  className="col-span-1 lg:col-span-2 w-full h-10 !bg-pink-600 hover:!bg-pink-700 text-white " 
                  loading={isSubmitting}
                >
                  Update Info
                </Button>
              </ form>
            </div>
          </div>
      </div>
    </UserLayout>
  );
};

export default ProfilePage;
