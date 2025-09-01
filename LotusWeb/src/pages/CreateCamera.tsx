
import { createCameraSchema, type CameraCreateFormValues } from "../validation/cameraSchema";
import { useForm, useWatch } from "react-hook-form";
import { Button, message, Modal, Typography, } from "antd";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useLoading } from "../hooks";
import { FormInput, MapPicker, SuccessNotification } from "../components";
import cameraApi from "../api/cameraApi";
import { useEffect, useRef, useState } from "react";
import { countryNameToCode } from "../utils/countryNameToCode";
import zipByCity from "../utils/zipByCity";
import { EnvironmentOutlined } from "@ant-design/icons";
import { fetchTimeZone } from "../utils/fetchTimeZone";

const { Title, } = Typography;

const CreateCamera: React.FC = () => {
    const {isLoading, startLoading, stopLoading} = useLoading();
    const [successOpen, setSuccessOpen] = useState(false);
    const [openMap, setOpenMap] = useState(false);
    const mapRef = useRef<L.Map | null>(null);

    const {
        control,
        handleSubmit,   
        formState: { errors, },
        reset,
        setValue,
    } = useForm<CameraCreateFormValues>({
        resolver: zodResolver(createCameraSchema),
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
            timezone: '',
        },
    });

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

    const onSubmit = async  (values: CameraCreateFormValues) => {
      try {
          startLoading();

          await cameraApi.createCamera(values);

          setSuccessOpen(true);
          reset();
      } catch (error) {
          console.error(error);
          message.error('Failed to create camera');
      } finally {
          stopLoading();
      }
    };

    const country = useWatch({ control, name: 'country', });
    const city = useWatch({ control, name: 'city', });

    useEffect(() => {
        if (country && countryNameToCode[country]) {
            setValue('countryCode', countryNameToCode[country]);
        } else {
            setValue('countryCode', undefined);
        }
    }, [country, setValue]);

    useEffect(() => {
        if (city && zipByCity[city]) {
            setValue('zipCode', zipByCity[city]);
        } else {
            setValue('zipCode', undefined);
        }
    }, [city, setValue]);

    useEffect(() => {
      if (openMap && mapRef.current) {
        // Delay nhỏ để modal render xong
        setTimeout(() => {
          mapRef.current?.invalidateSize();
        }, 300);
      }
    }, [openMap]);

return (
  <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-24">
    <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow dark:border dark:border-gray-00 p-8">
      <Title level={4} className="text-center !text-gray-900 dark:text-white mb-6 !font-bold">
        Create New Camera
      </Title>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-14 items-start pt-6"
      >
        <div>
          <FormInput label="Camera Name" name="name" control={control} error={errors.name?.message} />
        </div>

        <div>
          <FormInput label="Country" name="country" control={control} error={errors.country?.message} />
        </div>

        <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-end sm:gap-4">
                <div className="flex-1">
                    <FormInput
                        label="Latitude"
                        name="latitude"
                        control={control}
                        error={errors.latitude?.message}
                    />
                </div>

                <div className="flex-1">
                    <FormInput
                        label="Longitude"
                        name="longitude"
                        control={control}
                        error={errors.longitude?.message}
                    />
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

        <div>
          <FormInput label="City" name="city" control={control} error={errors.city?.message} />
        </div>

        <div>
          <FormInput label="IP Address" name="ipAddress" control={control} error={errors.ipAddress?.message} />
        </div>

        <div>
          <FormInput label="CountryCode" name="countryCode" control={control} error={errors.countryCode?.message} />
        </div>

        <div>
          <FormInput label="Stream URL" name="streamUrl" control={control} error={errors.streamUrl?.message} />
        </div>

        <div>
          <FormInput label="ZipCode" name="zipCode" control={control} error={errors.zipCode?.message} />
        </div>

        <div className="lg:col-span-2">
          <FormInput
            label="Description"
            name="description"
            control={control}
            error={errors.description?.message}
            type="textarea"
          />
        </div>  

        <Button
          type="primary"
          htmlType="submit"
          block
          className="col-span-1 lg:col-span-2 w-full h-10 !bg-pink-600 hover:!bg-pink-700 text-white"
          loading={isLoading}
        >
          Create Camera
        </Button>
        
      </form>

      <SuccessNotification
        open={successOpen}
        message="Camera was created success!"
        onClose={() => setSuccessOpen(false)}
      />
    </div>
  </div>
);
};

export default CreateCamera;

