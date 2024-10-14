"use client";

import { useEffect, useState, useRef } from "react";

type Post = {
	userId: number;
	id: number;
	title: string;
	body: string;
};

export default function DataFetching() {
	const [post, setPost] = useState<Post[]>([]);

	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState(null);

	const abortControllerRef = useRef<AbortController | null>(null);

	useEffect(() => {
		const fetchPost = async () => {
			abortControllerRef.current?.abort();
			abortControllerRef.current = new AbortController();

			setIsloading(true);
			setError(null);

			try {
				const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
					signal: abortControllerRef.current?.signal,
				});

				if (!res.ok) {
					throw new Error(`HTTP error, status: ${res.status}`);
				}

				const posts = (await res.json()) as Post[];
				setPost(posts);
			} catch (e: any) {
				if (e.name !== "AbortError") {
					setError(e);
					console.error(e);
				}
			} finally {
				setIsloading(false);
			}
		};

		fetchPost();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Something went wrong.</div>;
	}

	return (
		<div className="grid grid-cols-4 gap-8 px-8">
			{post.map((post) => (
				<div key={post.id} className="flex flex-col gap-8 bg-black">
					<h2 className="text-2xl">{post.title}</h2>
					<p>{post.body}</p>
				</div>
			))}
		</div>
	);
}
