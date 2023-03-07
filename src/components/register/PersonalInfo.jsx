import React from "react";

const PersonalInfo = ({ formData, setFormData }) => {
  return (
    <div>
      <div className="form-row">
        <div className="form-holder">
          <input
            value={formData.first_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                first_name: e.target.value,
              })
            }
            type="text"
            placeholder="First Name"
            className="form-control"
          />
        </div>
        <div className="form-holder">
          <input
            value={formData.last_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                last_name: e.target.value,
              })
            }
            type="text"
            placeholder="Last Name"
            className="form-control"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-holder">
          <input
            value={formData.username}
            onChange={(e) =>
              setFormData({
                ...formData,
                username: e.target.value,
              })
            }
            type="text"
            placeholder="Username"
            className="form-control"
          />
        </div>
        <div
          className="form-holder"
          style={{ alignSelf: "flex-end", transform: "translateY(4px)" }}
        ></div>
      </div>
    </div>
  );
};

export default PersonalInfo;
