import { useContext } from "react";
import { DonationContext } from "./DonationContext";

export const useDonation = () => {
  return useContext(DonationContext);
};