export const validateForm = (videoGame) => {
    let errors = {};

     if (!videoGame.name) {
        errors.name = 'Name is required';
    } else if (videoGame.name.length < 5 || videoGame.name.length > 50) {
        errors.name = 'Name must be between 5 and 50 characters';
    }

    if (!videoGame.description) {
        errors.description = 'Description is required';
    } else if (videoGame.description.length < 10 || videoGame.description.length > 1000) {
        errors.description = 'Description must be between 10 and 1000 characters';
    }


    if (!videoGame.image) {
        errors.image = 'Image URL is required';
    } else if (!/^http[s]?:\/\/.*/.test(videoGame.image)) {
        errors.image = 'Image URL is invalid';
    } else if (!/\.(jpeg|jpg|gif|png|svg)$/.test(videoGame.image)) {
        errors.image = 'Image URL must be an image file (.jpeg, .jpg, .gif, .png, .svg)';
    }

    if (!videoGame.releaseDate) {
        errors.releaseDate = 'Release date is required';
    } else if (new Date(videoGame.releaseDate) > new Date()) {
        errors.releaseDate = 'Release date must be before today\'s date';
    }

    if (!videoGame.rating) {
        errors.rating = 'Rating is required';
    } else if (isNaN(videoGame.rating)) {
        errors.rating = 'Rating must be a number';
    } else if (videoGame.rating < 1 || videoGame.rating > 5) {
        errors.rating = 'Rating must be between 1 and 5';
    }

    return errors;

}

