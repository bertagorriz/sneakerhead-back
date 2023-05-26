import { Types } from "mongoose";
import { type SneakerDatabaseStructure } from "../types";

export const mockSneakers: SneakerDatabaseStructure[] = [
  {
    _id: new Types.ObjectId(),
    name: "990v5",
    brand: "New Balance",
    image: "path/to/image",
    price: 290,
    colors: ["Grey"],
    features: {
      description: ["Comfortable and supportive", "Mesh and suede upper"],
      isAvailable: true,
    },
    user: "asdgaga7faghtaga",
  },
  {
    _id: new Types.ObjectId(),
    name: "Dunk Low",
    brand: "Nike",
    image: "path/to/image",
    price: 120,
    colors: ["Black", "White"],
    features: {
      description: ["Classic basketball shoe design", "Leather upper"],
      isAvailable: true,
    },
    user: "asdga4733vasdffgs",
  },
];
