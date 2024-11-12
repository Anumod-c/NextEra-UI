// src/components/user/ReviewCard.tsx
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import ProfilePicture from "../../assets/profile.png";
import userAxios from "../../constraints/axios/userAxios";
import { userEndpoints } from "../../constraints/endpoints/userEndPoints";

interface Review {
  rating: number;
  review: string;
  name: string;
  profilePicture: string;
}

interface ReviewCardProps {
  courseId?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ courseId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await userAxios.get(`${userEndpoints.fetchReviews}/${courseId}`);
        if (response.data.success) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const updatedReviews = response.data.newReview.map((rev: any) => ({
            rating: rev.rating,
            review: rev.review,
            name: rev.userDetails.user.name,
            profilePicture: rev.userDetails.user.profilePicture || ProfilePicture,
          }));
          setReviews(updatedReviews);
        } else {
          console.log("Failed to fetch reviews");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [courseId]);

  return (
    <Box className="p-4">
      <h2 className="text-lg font-semibold mb-4">User Reviews</h2>
      <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review, index) => (
            <Box key={index} className="p-4 border rounded-md shadow-sm bg-white">
              <div className="flex items-center gap-4 mb-2">
                <img
                  className="w-10 h-10 rounded-full"
                  src={review.profilePicture}
                  alt="Profile"
                />
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <Rating value={review.rating} readOnly size="small" />
                </div>
              </div>
              <p className="text-gray-700">{review.review}</p>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};

export default ReviewCard;
