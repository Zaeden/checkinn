import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: string[];
  adultCount: number;
  childCount: number;
};

type Props = {
  onSave: (HotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((hotelFormData: HotelFormData) => {
    // console.log(formData);
    const formData = new FormData();
    formData.append("name", hotelFormData.name || "");
    formData.append("city", hotelFormData.city || "");
    formData.append("country", hotelFormData.country || "");
    formData.append("description", hotelFormData.description || "");
    formData.append("type", hotelFormData.type || "");
    formData.append(
      "pricePerNight",
      (hotelFormData.pricePerNight || 0).toString()
    );
    formData.append("starRating", (hotelFormData.starRating || 0).toString());
    formData.append("adultCount", (hotelFormData.adultCount || 0).toString());
    formData.append("childCount", (hotelFormData.childCount || 0).toString());

    hotelFormData.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    Array.from(hotelFormData.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? "Saving...." : "Save"}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
