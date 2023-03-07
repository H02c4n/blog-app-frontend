import React, { useState } from "react";
import { RxUpdate } from 'react-icons/rx';
import { useSelector } from "react-redux";
import useBlogCalls from "../hooks/useBlogCalls";

const CustomCss = ({currentUserId}) => {



    
  const { themes } = useSelector((state) => state.blog);
  const {updateStyle} = useBlogCalls();

  const initialState ={

  }

  themes?.forEach(theme => {
    if (theme.theme_owner_id === currentUserId) {
      initialState.first_color = theme?.first_color;
    initialState.second_color = theme?.second_color;
    initialState.font_color = theme?.font_color;
    initialState.font_size = theme?.font_size;
    }
  });



  const [color, setColor] = useState({
    font_color: initialState?.font_color || "#ffffff",
    first_color: initialState?.first_color || "#ffffff",
    second_color: initialState?.second_color || "#ffffff",
    font_size: initialState?.font_size || null
  });


  const styleSubmit = (e) => {
    e.preventDefault();
    updateStyle(color);
  }


  return (
   <form action="" onSubmit={styleSubmit}>
    <div className="row d-flex justify-content-evenly">
    <div className="col-md-3 col-sm-6 d-flex flex-column align-items-center p-1">
      <label htmlFor="">Primary Color</label>
      <input 
      type="color"
      value={color?.first_color}
      onChange={(e)=>setColor({...color, first_color:e.target.value})}
      />
      <div style={{
        width:50,
        height:50,
        marginTop:20,
        backgroundColor:color?.first_color
      }}></div>
    </div>
    <div className="col-md-3 col-sm-6 d-flex flex-column align-items-center p-1">
    <label htmlFor="">Secondary Color</label>
      <input 
      type="color"
      value={color?.second_color}
      onChange={(e)=>setColor({...color, second_color:e.target.value})}
      />
      <div style={{
        width:50,
        height:50,
        marginTop:20,
        backgroundColor:color?.second_color
      }}></div>
    </div>
    <div className="col-md-3 col-sm-6 d-flex flex-column align-items-center p-1">
    <label htmlFor="">Font Color</label>
      <input 
      type="color"
      value={color?.font_color}
      onChange={(e)=>setColor({...color, font_color:e.target.value})}
      />
      <div style={{
        width:50,
        height:50,
        marginTop:20,
        backgroundColor:color?.font_color
      }}></div>
    </div>
    <div className="col-md-3 col-sm-6 d-flex flex-column align-items-center p-1">
    <label htmlFor="">Font Size</label>
      <input 
      className="w-50 text-center"
      type="number"
      min="16"
      max="32"
      value={color?.font_size}
      onChange={(e)=>setColor({...color, font_size:e.target.value})}
      />
      <p style={{fontSize:`${color?.font_size}px`}} >{color?.font_size}</p>
    </div>
    <div className="col-md-3 col-sm-6 d-flex flex-column align-items-center p-1 mt-3">
      <button className="btn btn-warning"><RxUpdate/> Save Your Change</button>
    </div>
   </div>
   </form>
  );
};

export default CustomCss;
