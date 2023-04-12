const extension = process.env.NODE_ENV === 'production' ? 'webp' : 'jpg' 

export function getMotivationalPictures() {
	return new Promise(resolve => {
		setTimeout(() => {
			const mockedResponse = [
				`images/motivational-pictures/mountain.${extension}`,
				`images/motivational-pictures/darts.${extension}`,
				`images/motivational-pictures/passion.${extension}`,
			];
			resolve(mockedResponse);
		}, 700);
	})
}