export type Restaurant = {
  id: string;
  name: string;
  address: string;
  isOpen: boolean;
  workingHours: {
    open: string;
    close: string;
  };
  minimumOrder: number;
  menuId: string;
  heroImageUrl: string;
};
