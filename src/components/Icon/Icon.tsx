import React from 'react';
import {Colors, Icons} from "../../api/api";

export type IconType = {
    icon: Icons
    color: Colors
}

export const Icon: React.FC<IconType> = ({ icon, color }) => {
  return <span className="material-icons" style={{color}}>
                  {icon}
                </span>;
};
