import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  icon: string;
  title: string;
  titleIcon: string;
  description: string;
  link: string;
  linkText: string;
  assignment?: string;
}

const Card: React.FC<CardProps> = ({ 
  icon, 
  title, 
  titleIcon, 
  description, 
  link, 
  linkText, 
  assignment 
}) => {
  return (
    <div className="card" data-assignment={assignment}>
      <div className="icon">
        <i className={icon}></i>
      </div>
      <h2>
        <i className={titleIcon}></i> {title}
      </h2>
      <p>{description}</p>
      <Link to={link}>
        <button className="btn">{linkText}</button>
      </Link>
    </div>
  );
};

export default Card;
