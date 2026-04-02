import { Link } from "react-router-dom";
import MenuItemCard from "./MenuItemCard";

const menuItems = [
  {
    id: 1,
    name: "Greek salad",
    description:
      "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
    price: "$12.99",
    image: "/greek-salad.jpg",
  },
  {
    id: 2,
    name: "Bruchetta",
    description:
      "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
    price: "$5.99",
    image: "/bruchetta.svg",
  },
  {
    id: 3,
    name: "Lemon Dessert",
    description:
      "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
    price: "$5.00",
    image: "/lemon-dessert.jpg",
  },
];

const Specials = () => {
  return (
    <section className="specials">
      <div className="specials-header">
        <h2 className="specials-title">Specials</h2>
        <Link to="/menu" className="btn btn-dark">
          Online Menu
        </Link>
      </div>
      <div className="specials-grid">
        {menuItems.map((item) => (
          <MenuItemCard key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Specials;
