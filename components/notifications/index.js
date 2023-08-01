import React, { useState } from 'react'

const Notifications = () => {

	const [isToggled, setIsToggled] = useState(false);

	return (

		<div>
			<img
				onClick={() => setIsToggled(!isToggled)}
				src={"/bell.svg"}
				className="h-10 w-10 mx-4 hover:opacity-50 cursor-pointer"
				alt="notification icon"
			/>

			{isToggled && (
				<div className="absolute top-14 right-0 w-72 h-96 bg-black border-2 border-lime-600 rounded-md text-center">

					<div className="py-2"><span className="text-slate-100 text-lg">Notifications</span></div>
				</div>
			)}
		</div>

	)

}

export default Notifications;
