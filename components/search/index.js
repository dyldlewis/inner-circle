import React, { useState } from 'react'

const Search = () => {
	const [isToggled, setIsToggled] = useState(false);
	const [searchWidth, setSearchWidth] = useState("w-0 bg-black")
	const toggleSearch = () => {
		if (searchWidth === "w-96") {
			setSearchWidth("w-0 bg-black")
		} else {

		setSearchWidth("w-96")
		}
	};

	return (

		<div>
			<img
				src={"/search.svg"}
				height={25}
				width={25}
				className="h-10 w-10 hover:opacity-50 hover:cursor-pointer"
				alt="settings icon"
				onClick={toggleSearch}

			/>

			<div className='absolute top-4 right-48'>

				<input type="text" placeholder="Search..." className={` px-2  rounded ${searchWidth} h-8  transition-width duration-500 ease-in-out outline-none text-gray-800`} />

			</div>
		</div>
	)

}


export default Search;
