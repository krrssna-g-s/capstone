const deliveryIcon = "/delivery-icon.svg";

const MenuItemCard = ({ name, description, price, image }) => {
  return (
    <article className="menu-card">
      <img src={image} alt={name} className="menu-card-image" />
      <div className="menu-card-body">
        <div className="menu-card-header">
          <h3 className="menu-card-name">{name}</h3>
          <span className="menu-card-price">{price}</span>
        </div>
        <p className="menu-card-description">{description}</p>
        <a href="/order-online" className="menu-card-order">
          Order a delivery
          <img src={deliveryIcon} alt="" className="menu-card-order-icon" />
        </a>
      </div>
    </article>
  );
};

export default MenuItemCard;
