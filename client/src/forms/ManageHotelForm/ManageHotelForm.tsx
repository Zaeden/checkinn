import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../server/src/shared/types";
import { useEffect } from "react";

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
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

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

    if (hotelFormData.imageFiles) {
      hotelFormData.imageFiles.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

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
