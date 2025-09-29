'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlassPanel } from "@/components/ui/glass";
import { pb } from '@/lib/pocketbase';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="relative py-16" id="blog">

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
                className="rounded-full w-24 h-24 object-cover" 
                alt="Blog" 
                width={100} 
                height={100} 
              />
              <h2 className="text-frappe-text dark:text-white text-3xl font-bold">Latest Posts</h2>
            </div>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-frappe-text dark:border-white"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                >
                  <Link href={`https://bee.whoisjason.me/blogposts/${post.id}`}>
                    <Card className="border border-input bg-card text-card-foreground h-full flex flex-col">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-semibold text-foreground">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0 text-sm text-muted-foreground flex-1">
                        <p className="line-clamp-2">{post.description}</p>
                      </CardContent>
                      <CardFooter className="pt-3 flex items-center justify-between text-xs mt-auto">
                        <span className="text-frappe-blue">
                          {new Date(post.created).toLocaleDateString()}
                        </span>
                        <Button variant="link" className="px-0 h-auto text-frappe-peach hover:text-frappe-peach/80">
                          Read more →
                        </Button>
                      </CardFooter>
                    </Card>
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
