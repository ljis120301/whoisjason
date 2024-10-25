'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { pb } from '@/lib/pocketbase';
import { Button } from "@/components/ui/button";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const records = await pb.collection('posts').getList(1, 2, {
          sort: '-created',
        });
        setPosts(records.items);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="relative py-16" id="section_4">
      {/* Grid background with overlay */}
      <div className="absolute inset-0 dark:bg-frappe-mantle bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-frappe-base bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center items-center gap-4">
              <Image 
                src="/white-desk-work-study-aesthetics.jpg" 
                className="rounded-full" 
                alt="Blog" 
                width={100} 
                height={75} 
              />
              <h2 className="text-white text-3xl font-bold">Latest Posts</h2>
            </div>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-frappe-surface0 rounded-lg overflow-hidden shadow-lg"
                >
                  <Link href={`https://bee.whoisjason.me/blogposts/${post.id}`}>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
                      <p className="text-frappe-subtext0 mb-4 line-clamp-2">{post.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-frappe-blue text-sm">
                          {new Date(post.created).toLocaleDateString()}
                        </span>
                        <Button variant="link" className="text-frappe-peach hover:text-frappe-peach/80">
                          Read more →
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <Button asChild variant="outline" className="border-2 border-frappe-blue text-frappe-blue hover:bg-frappe-blue hover:text-white">
              <Link href="https://bee.whoisjason.me">
                Visit Blog
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
