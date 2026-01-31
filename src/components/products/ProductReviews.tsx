"use client";

import React, { useState } from "react";
import {
  Star,
  MessageSquare,
  ThumbsUp,
  ChevronDown,
  User,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpful: number;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    user: "Sarah J.",
    rating: 5,
    date: "2 days ago",
    comment:
      "Absolutely amazing! I've been using this for a week and I feel a significant difference in my energy levels. Highly recommend!",
    verified: true,
    helpful: 12,
  },
  {
    id: "2",
    user: "Robert K.",
    rating: 4,
    date: "1 week ago",
    comment:
      "Very high quality product. The packaging was excellent and shipping was faster than expected. Only reason for 4 stars is the price, but you get what you pay for.",
    verified: true,
    helpful: 5,
  },
  {
    id: "3",
    user: "Emily D.",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "This is exactly what I was looking for. Authentic and fresh. GHT Health is now my go-to for all my supplements.",
    verified: true,
    helpful: 8,
  },
];

export const ProductReviews = ({ productRating = 4.8, reviewCount = 24 }) => {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [isOpen, setIsOpen] = useState(false);

  const stats = [
    { stars: 5, count: 18, percentage: 75 },
    { stars: 4, count: 4, percentage: 16 },
    { stars: 3, count: 2, percentage: 8 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 },
  ];

  return (
    <div className="py-12 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Rating Summary */}
        <div className="lg:col-span-4">
          <h3 className="text-2xl font-black text-foreground mb-8">
            Customer Reviews
          </h3>

          <div className="bg-card border border-border/50 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="text-5xl font-black text-foreground">
                {productRating}
              </div>
              <div className="space-y-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={
                        i < Math.floor(productRating) ? "currentColor" : "none"
                      }
                      className={
                        i < Math.floor(productRating)
                          ? ""
                          : "text-muted-foreground/30"
                      }
                    />
                  ))}
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Based on {reviewCount} reviews
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.stars} className="flex items-center gap-4">
                  <span className="text-sm font-bold text-muted-foreground w-12">
                    {stat.stars} Stars
                  </span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-muted-foreground w-8 text-right">
                    {stat.count}
                  </span>
                </div>
              ))}
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="w-full h-14 rounded-2xl ght-gradient text-white font-black shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                  Write a Review
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] rounded-[3rem] p-8 sm:p-12">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black">
                    Share your experience
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                      Rating
                    </Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          className="text-muted-foreground/30 hover:text-amber-400 transition-colors"
                        >
                          <Star size={32} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                      Full Name
                    </Label>
                    <Input placeholder="John Doe" className="h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                      Review Title
                    </Label>
                    <Input
                      placeholder="Example: Amazing product!"
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                      Message
                    </Label>
                    <Textarea
                      placeholder="What did you like or dislike?"
                      className="min-h-[120px] rounded-xl"
                    />
                  </div>
                  <Button
                    className="w-full h-14 rounded-2xl ght-gradient text-white font-black"
                    onClick={() => setIsOpen(false)}
                  >
                    Submit Review
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
            <h4 className="text-lg font-bold text-foreground">
              Recent Reviews
            </h4>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground font-bold"
            >
              Most Relevant <ChevronDown size={16} className="ml-1" />
            </Button>
          </div>

          <div className="space-y-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="group pb-8 border-b border-border/50 last:border-0"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User size={24} />
                    </div>
                    <div>
                      <h5 className="font-bold text-foreground flex items-center gap-2">
                        {review.user}
                        {review.verified && (
                          <span className="inline-flex items-center gap-1 bg-ght-success/10 text-ght-success text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">
                            <Check size={10} strokeWidth={4} /> Verified Buyer
                          </span>
                        )}
                      </h5>
                      <div className="flex text-amber-400 gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={i < review.rating ? "currentColor" : "none"}
                            className={
                              i < review.rating
                                ? ""
                                : "text-muted-foreground/30"
                            }
                          />
                        ))}
                        <span className="text-[10px] text-muted-foreground font-bold ml-2">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {review.comment}
                </p>

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                    <ThumbsUp size={14} /> Helpful ({review.helpful})
                  </button>
                  <button className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors">
                    Report
                  </button>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full h-14 rounded-2xl border-dashed border-2 hover:bg-primary/5 font-bold"
            >
              Load More Reviews
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
