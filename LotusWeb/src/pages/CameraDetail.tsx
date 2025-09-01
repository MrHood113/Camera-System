import { useEffect, useRef, useState, } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Input, Button, message, Spin, Modal } from 'antd';
import {  useForm, } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { updateCameraSchema, type CameraUpdateFormValues } from '../validation/cameraSchema';
import { useCameraById, useUpdateCamera } from '../hooks';
import { MapPicker, SuccessNotification } from '../components';
import FormField from '../components/form/FormField';
import Title from 'antd/es/typography/Title';
import { EnvironmentOutlined } from "@ant-design/icons";
import { fetchTimeZone } from '../utils/fetchTimeZone';


const CameraDetail: React.FC = () => {
  const location = useLocation();
  const [successOpen, setSuccessOpen] = useState(false);
  const { camera: locationCamera } = location.state || {};
  const { id } = useParams();
  const navigate = useNavigate();
  const updateMutation = useUpdateCamera();
  const [openMap, setOpenMap] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  const{
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CameraUpdateFormValues>({
    resolver: zodResolver(updateCameraSchema),
    mode: 'onBlur', 
    defaultValues: {
      name: '',
        latitude: undefined,
        longitude: undefined,
        country: '',
        city: '',
        countryCode: '',
        zipCode: '',
        ipAddress: '',
        streamUrl: '',
        description: '',
        note: '',
    },
  });

  const {
    data: fetchedCamera,
    isLoading,
    isError,
  } = useCameraById(Number(id), {
    enabled: !locationCamera && !!id,
  });

  useEffect(() => {
    if (locationCamera && typeof locationCamera === 'object') {
      reset(locationCamera);
    } else if(fetchedCamera)
    {
        reset(fetchedCamera);
    }
  }, [locationCamera, fetchedCamera, reset]);

  const onSubmit = async (values: CameraUpdateFormValues) => {
    console.log("Submitting with data:", values);
    try {
      const res = await updateMutation.mutateAsync({id: Number(id), data: values});
      console.log(res);
      
      setSuccessOpen(true);
      message.success('Camera updated successfully!');
      
      navigate('/homepage');
    } catch (error) {
      console.error(error);
      message.error('Update failed. Please try again.');
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
    message.error('Camera not found. Redirecting...');
    navigate('/homepage');
    return null;
  }

  const handleLocationSelected = async (lat: number, lng: number) => {
        setValue("latitude", lat);
        setValue("longitude", lng);
        setOpenMap(false);
  
        try {
          const tz = await fetchTimeZone(lat, lng);
          console.log("Fetched TimeZone:", tz);
  
          if (tz) {
            await setValue("timezone", tz, { shouldValidate: true });
            message.success(`TimeZone detected: ${tz}`);
          } else {
            message.warning("No TimeZone received from API.");
          }
        } catch (err) {
          console.error("Failed to fetch timezone", err);
        }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-24">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow dark:border dark:border-gray-00 p-8">
        <Title level={4} className="text-center !text-gray-900 dark:text-white mb-6 !font-bold">
          Update Camera
        </Title>

        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-14 items-start pt-6"
        >
          
          <FormField<CameraUpdateFormValues, 'name'> name="name" label="Camera Name" control={control} errors={errors}
          inputNode={(props) => <Input {...props} className="... h-10" />} />

          <FormField<CameraUpdateFormValues, 'country'> name="country" label="Country" control={control} errors={errors}
            inputNode={(props) => <Input {...props} className="... h-10" />} />

            <div className='space-y-2'>
              <div className="flex flex-col sm:flex-row sm:items-end sm:gap-4">
                <div className="flex-1">
                  <FormField<CameraUpdateFormValues, 'latitude'> name="latitude" label="Latitude" control={control} errors={errors}
                    inputNode={(props) => <Input {...props} className="... h-10" />} />
                </div>

                <div className="flex-1">
                  <FormField<CameraUpdateFormValues, 'longitude'> name="longitude" label="Longitude" control={control} errors={errors}
                    inputNode={(props) => <Input {...props} className="... h-10" />} />
                </div>

                <Button
                    type="primary"
                    icon={<EnvironmentOutlined />}
                    onClick={() => setOpenMap(true)}
                    className="w-full min-w-[40px] h-[38px] mt-[22px] bg-pink-600 hover:!bg-pink-700 text-white rounded-md text-sm"
                />

                <Modal
                    title="Pick a location"
                    open={openMap}
                    onCancel={() => setOpenMap(false)}
                    footer={null}
                    width={800}
                    >
                        {openMap && (
                            <MapPicker
                                onLocationSelected={handleLocationSelected}
                                defaultLatLng={
                                    {
                                        lat: control._formValues.latitude ?? 15.97901801986256,
                                        lng: control._formValues.longitude ?? 108.26205786589402,
                                    }
                                }
                                mapRef={mapRef}
                            />
                        )}
                </Modal>
              </div>
            </div>

          <FormField<CameraUpdateFormValues, 'city'> name="city" label="City" control={control} errors={errors}
            inputNode={(props) => <Input {...props} className="... h-10" />} />

          <FormField<CameraUpdateFormValues, 'countryCode'> name="countryCode" label="Country Code" control={control} errors={errors}
            inputNode={(props) => <Input {...props} className="... h-10" />} />

          <FormField<CameraUpdateFormValues, 'ipAddress'> name="ipAddress" label="IP Address" control={control} errors={errors}
            inputNode={(props) => <Input {...props} className="... h-10" />} />

          <FormField<CameraUpdateFormValues, 'zipCode'> name="zipCode" label="Zip Code" control={control} errors={errors}
            inputNode={(props) => <Input {...props} className="... h-10" />} />

          <FormField<CameraUpdateFormValues, 'streamUrl'> name="streamUrl" label="Stream URL" control={control} errors={errors}
            inputNode={(props) => <Input {...props} className="... h-10" />} />

          <div className="lg:col-span-2">
            <FormField<CameraUpdateFormValues, 'description'> name="description" label="Description" control={control} errors={errors}
            inputNode={(props) => <Input.TextArea {...props} className="... h-10" />} />

            <FormField<CameraUpdateFormValues, 'note'> name="note" label="Note" control={control} errors={errors}
              inputNode={(props) => <Input.TextArea {...props} className="... h-10" />} />
          </div>

          <Button 
            htmlType="submit" 
            type="primary" 
            block
            className="col-span-1 lg:col-span-2 w-full h-10 !bg-pink-600 hover:!bg-pink-700 text-white" 
            loading={isSubmitting}
          >
            Update Camera
          </Button>

          <SuccessNotification
            open={successOpen}
            message="Camera was updated success!"
            onClose={() => setSuccessOpen(false)}
        />
        </form>
      </div>
    </div>
  );
};

export default CameraDetail;
