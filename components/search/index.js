import React, { useState } from 'react'

const Search = () => {

	const [isToggled, setIsToggled] = useState(false);

	return (

		<div>


				
        <img
          src={"/settings.svg"}
          height={25}
          width={25}
          className="h-10 w-10 hover:opacity-50 hover:cursor-pointer"
          alt="settings icon"
          onClick={() => setIsToggled(!isToggled)}
        />
					{isToggled && (
			<div className="search-bar absolute top-4 mx-auto">

				<input type="text" placeholder="Search..." className="py-1 px-2 rounded bg-white text-gray-800" />

			</div>)}
		</div>
	)

}


export default Search;
