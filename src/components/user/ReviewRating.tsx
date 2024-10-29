import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ProfilePicture from "../../assets/profile.png";
const labels: { [index: number]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const ReviewRating: React.FC = () => {
  const [rating, setRating] = React.useState<number | null>(3);
  const [hover, setHover] = React.useState(-1);
  const [review, setReview] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [reviews, setReviews] = React.useState<
    { rating: number; review: string }[]
  >([]); // Initial reviews state

  const handleReviewSubmit = () => {
    // Validate review length
    if (review.length < 10) {
      setError("Review must be at least 10 characters long.");
      return;
    }
    if (review.length > 200) {
      setError("Review cannot exceed 200 characters.");
      return;
    }
    setError(null);

    // Add the new review
    setReviews([...reviews, { rating: rating || 3, review }]);
    setReview("");
    setRating(3); // Reset rating to a default
  };

  return (
    <Box className="flex flex-col  p-4 rounded-md shadow-md max-w-md mx-auto my-4">
      <p className="text-lg font-semibold">Rate and Review this Course</p>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Rating
          name="hover-feedback"
          value={rating}
          size="large"
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => setRating(newValue)}
          onChangeActive={(event, newHover) => setHover(newHover)}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        {rating !== null && (
          <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
        )}
      </Box>

      <TextField
        label="Write your review"
        multiline
        fullWidth
        rows={3}
        value={review}
        onChange={(e) => setReview(e.target.value)}
        error={!!error}
        helperText={error || " "}
        variant="outlined"
        placeholder="Share your thoughts about this course..."
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleReviewSubmit}
        className="mt-2"
      >
        Post Review
      </Button>

      {/* Display list of reviews */}
      <Box className="mt-4">
        <p className="text-lg font-semibold mb-2">Reviews:</p>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((reviewItem, index) => (
            <Box key={index} className="p-2 mb-2 bg-white rounded shadow-sm">
              <div className="flex gap-4">
                <img  className="w-12 h-12 rounded-full" src={ProfilePicture} alt="profilePicture" />
                <div className="flex flex-col">
                  <p>Username</p>
                  <Rating
                    value={reviewItem.rating}
                    readOnly
                    size="small"
                    precision={0.5}
                  />
                                <p className="text-gray-700 mt-1">{reviewItem.review}</p>

                </div>
              </div>

            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default ReviewRating;
