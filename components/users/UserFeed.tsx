'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, AlertCircle, UsersIcon } from 'lucide-react';
import UserCard from './UserCard';
import UserCardSkeleton from './UserCardSkeleton';
import type { User } from '@/types/user';
import Link from 'next/link';

const USERS_PER_PAGE = 10;

export default function UserFeed() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const fetchUsers = useCallback(
    async (pageNum: number, reset = false) => {
      if (loading) return;

      setLoading(true);
      setError(null);

      try {
        const skip = pageNum * USERS_PER_PAGE;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/GetUsersList?take=${USERS_PER_PAGE}&skip=${skip}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (reset) {
          setUsers(data.users);
        } else {
          setUsers(prev => [...prev, ...data.users]);
        }

        setHasMore(data.users.length === USERS_PER_PAGE);
        setPage(pageNum);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  // Initial load
  useEffect(() => {
    fetchUsers(0, true);
  }, []);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (loading || !hasMore) return;

    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchUsers(page + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, hasMore, page, fetchUsers]);

  // Filter users based on search term
  const filteredUsers = users.filter(
    user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRetry = () => {
    setError(null);
    setUsers([]);
    setPage(0);
    setHasMore(true);
    fetchUsers(0, true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User Feed</h1>
            <p className="text-gray-600">
              Browse users with infinite scrolling and optimized performance
            </p>
          </div>
          <Link href="/">
            <Button variant="outline">← Back to Home</Button>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <UsersIcon className="w-4 h-4" />
            <span>{filteredUsers.length} users loaded</span>
          </div>
        </div>
      </div>

      {error && (
        <Alert className="mb-6" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>Error loading users: {error}</span>
            <Button variant="outline" size="sm" onClick={handleRetry}>
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredUsers.map((user, index) => (
          <UserCard key={`${user.id}-${index}`} user={user} />
        ))}

        {loading &&
          Array.from({ length: USERS_PER_PAGE }).map((_, index) => (
            <UserCardSkeleton key={`skeleton-${index}`} />
          ))}
      </div>

      {filteredUsers.length === 0 && !loading && !error && (
        <Card className="mt-8">
          <CardContent className="text-center py-12">
            <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? 'Try adjusting your search terms.'
                : 'No users available at the moment.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Intersection Observer target */}
      <div ref={loadingRef} className="h-10" />

      {!hasMore && filteredUsers.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>You've reached the end of the user list!</p>
        </div>
      )}
    </div>
  );
}
