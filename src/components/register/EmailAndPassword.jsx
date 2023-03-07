import React from 'react'

const EmailAndPassword = ({formData, setFormData}) => {
  return (
    <div>
      <div className="form-row">
      <div className="form-holder">
									<input
									value={formData.email}
									onChange={(e) => setFormData({
										...formData, email:e.target.value
									  })}
									type="email" placeholder="Your Email" className="form-control"/>
								</div>
        </div>
        <div className="form-row">
        <div className="form-holder">
									<input
									value={formData.password}
									onChange={(e) => setFormData({
										...formData, password:e.target.value
									  })}
									type="password" placeholder="Password" className="form-control"/>
								</div>
                <div className="form-holder">
									<input
									value={formData.password2}
									onChange={(e) => setFormData({
										...formData, password2:e.target.value
									  })}
									type="password" placeholder="Password" className="form-control"/>
								</div>
          
        </div>
        
    </div>
  )
}

export default EmailAndPassword