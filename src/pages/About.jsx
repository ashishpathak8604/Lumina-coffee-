import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageCircle, User, ThumbsUp, Send, ChevronLeft, ChevronRight } from 'lucide-react';

const initialReviews = [
  {
    id: 1,
    author: "Sarah Jenkins",
    rating: 5,
    date: "March 2, 2026",
    text: "Absolutely the best signature blend I have ever had. The caramel notes are perfectly balanced and the crema is always flawless. Lumina is my daily go-to sanctuary now.",
    likes: 24,
    comments: [
      { id: 101, author: "Michael T.", text: "Totally agree! Their Oat Milk Flat White uses the same blend and it's incredible." }
    ]
  },
  {
    id: 2,
    author: "David Chen",
    rating: 4,
    date: "February 28, 2026",
    text: "Great atmosphere and fantastic single-origins. The Ethiopian Yirgacheffe really highlights the citrus acidity well. Only giving 4 stars because it's always packed on weekends!",
    likes: 12,
    comments: []
  },
  {
    id: 3,
    author: "Elena Rivera",
    rating: 5,
    date: "February 25, 2026",
    text: "The Midnight Espresso is life-changing. I have traveled all over Italy and this rivals the best cafes in Rome.",
    likes: 38,
    comments: []
  },
  {
    id: 4,
    author: "Marcus T.",
    rating: 5,
    date: "February 20, 2026",
    text: "Incredible Cold Brew Reserve. So smooth, absolutely zero bitterness. I buy a bottle every week.",
    likes: 15,
    comments: []
  }
];

const REVIEWS_PER_PAGE = 3;

function About() {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('lumina_coffee_reviews');
    return savedReviews ? JSON.parse(savedReviews) : initialReviews;
  });

  useEffect(() => {
    localStorage.setItem('lumina_coffee_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const [newReview, setNewReview] = useState({ author: '', rating: 5, text: '' });
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const paginatedReviews = reviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.text) return;

    const review = {
      id: Date.now(),
      author: newReview.author,
      rating: newReview.rating,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      text: newReview.text,
      likes: 0,
      comments: []
    };

    setReviews([review, ...reviews]);
    setNewReview({ author: '', rating: 5, text: '' });
    setCurrentPage(1); // Reset to first page to see the new review
  };

  const handleCommentSubmit = (e, reviewId) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          comments: [...review.comments, { id: Date.now(), author: "Guest User", text: newComment }]
        };
      }
      return review;
    });

    setReviews(updatedReviews);
    setNewComment("");
    setActiveCommentId(null);
  };

  const toggleLike = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, likes: review.likes + 1 } : review
    ));
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-32 pb-20 relative overflow-hidden">
      {/* Background element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 mix-blend-screen pointer-events-none"></div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center px-6 relative z-10 mb-32">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           className="space-y-8"
        >
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter">
            Our <span className="text-amber-500">Story.</span>
          </h1>
          <div className="space-y-6 text-neutral-400 text-lg font-light leading-relaxed">
            <p>
              It started with a simple belief: coffee isn't just a drink, it's a craft. From the high-altitude farms of Colombia to our precision roasters in the city, every bean we source represents a commitment to excellence.
            </p>
            <p>
              We partner directly with farmers, ensuring fair trade practices and sustainable agriculture. When you drink our coffee, you're not just tasting a unique flavor profile—you're supporting a global community of artisans.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-neutral-800">
             <div>
               <div className="text-4xl font-black text-white">2010</div>
               <div className="text-sm text-neutral-500 mt-1">Established</div>
             </div>
             <div>
               <div className="text-4xl font-black text-white">15+</div>
               <div className="text-sm text-neutral-500 mt-1">Single Origins</div>
             </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 hidden lg:block"
        >
           <img src="/cafe-bg.png" alt="Our Cafe" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
        </motion.div>
      </div>

      {/* Community Reviews Section */}
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Community <span className="text-amber-500">Reviews.</span></h2>
          <p className="text-neutral-400 text-lg">See what our connoisseurs are saying about their Lumina experience.</p>
        </motion.div>

        {/* Add Review Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-6 md:p-8 mb-16"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
             <MessageCircle className="w-6 h-6 text-amber-500" />
             Leave a Review
          </h3>
          <form onSubmit={handleReviewSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">Your Name</label>
                <input 
                  type="text" 
                  value={newReview.author}
                  onChange={(e) => setNewReview({...newReview, author: e.target.value})}
                  required
                  placeholder="John Doe"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">Rating</label>
                <div className="flex gap-2 h-[50px] items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star}
                      type="button"
                      onClick={() => setNewReview({...newReview, rating: star})}
                      className="focus:outline-none focus:scale-110 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-8 h-8 ${star <= newReview.rating ? 'fill-amber-500 text-amber-500' : 'text-neutral-700'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-400">Your Experience</label>
              <textarea 
                value={newReview.text}
                onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                required
                rows="4"
                placeholder="Tell us about the roast, the vibe, or the service..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="bg-amber-500 text-neutral-950 px-8 py-3 rounded-full font-bold hover:bg-amber-400 transition-colors flex items-center gap-2"
            >
              Post Review
            </button>
          </form>
        </motion.div>

        {/* Reviews List */}
        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {paginatedReviews.map((review) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-neutral-900/30 border border-neutral-800 rounded-3xl p-6 md:p-8"
              >
                {/* Review Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 shrink-0">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{review.author}</h4>
                      <p className="text-neutral-500 text-sm">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-neutral-700'}`} />
                    ))}
                  </div>
                </div>

                {/* Review Body */}
                <p className="text-neutral-300 leading-relaxed mb-6 italic text-lg">"{review.text}"</p>

                {/* Review Actions */}
                <div className="flex items-center gap-6 border-t border-neutral-800 pt-6">
                  <button 
                    onClick={() => toggleLike(review.id)}
                    className="flex items-center gap-2 text-sm text-neutral-500 hover:text-amber-500 transition-colors group"
                  >
                    <ThumbsUp className="w-5 h-5 group-active:scale-125 transition-transform" /> 
                    <span className="font-bold">{review.likes} Helpful</span>
                  </button>
                  <button 
                    onClick={() => setActiveCommentId(activeCommentId === review.id ? null : review.id)}
                    className="flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" /> 
                    <span className="font-bold">Reply ({review.comments.length})</span>
                  </button>
                </div>

                {/* Comments Section */}
                <AnimatePresence>
                  {(review.comments.length > 0 || activeCommentId === review.id) && (
                    <motion.div 
                      key={`comments-${review.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pl-4 md:pl-8 border-l-2 border-neutral-800 space-y-4 overflow-hidden"
                    >
                      {review.comments.map(comment => (
                        <div key={comment.id} className="bg-neutral-950 rounded-2xl p-4 border border-neutral-800/50">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4 text-amber-500" />
                            <span className="font-bold text-sm text-white">{comment.author}</span>
                          </div>
                          <p className="text-neutral-400 text-sm leading-relaxed">{comment.text}</p>
                        </div>
                      ))}

                      {/* Active Comment Form */}
                      {activeCommentId === review.id && (
                        <motion.form 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onSubmit={(e) => handleCommentSubmit(e, review.id)} 
                          className="flex gap-3 pt-2"
                        >
                          <input 
                            type="text" 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a public reply..."
                            autoFocus
                            className="flex-grow bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                          />
                          <button type="submit" className="bg-amber-500 text-neutral-950 px-6 rounded-xl hover:bg-amber-400 font-bold transition-colors flex shrink-0 items-center gap-2">
                            <span>Post</span>
                            <Send className="w-4 h-4" />
                          </button>
                        </motion.form>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center bg-neutral-900/50 text-white hover:border-amber-500 hover:text-amber-500 transition-colors disabled:opacity-50 disabled:hover:border-neutral-800 disabled:hover:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="text-neutral-400 font-medium">
              Page <span className="text-white">{currentPage}</span> of <span className="text-white">{totalPages}</span>
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center bg-neutral-900/50 text-white hover:border-amber-500 hover:text-amber-500 transition-colors disabled:opacity-50 disabled:hover:border-neutral-800 disabled:hover:text-white"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default About;
