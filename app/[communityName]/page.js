"use client"

import { useParams, useRouter } from "next/navigation";
import { useSupabase } from "../components/supabase-provider";
import { useEffect, useState } from "react";

function Post({ post, params }) {
    const router = useRouter();

    return (<>
        <div onClick={() => router.push(`${params.communityName}/${post.id}`)} className="card mb-12 bg-base-100 shadow-xl hover:cursor-pointer">
            <div className="card-body">
                <div>
                    <h2 className="card-title">{post.title}</h2>
                    <h3 className="font-bold text-primary">{post.profiles.username}</h3>
                </div>
                <p>{post.content && post.content}</p>
            </div>
        </div>
    </>);
}

export default function () {
    const router = useRouter();
    const params = useParams();
    const { supabase } = useSupabase();
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        async function fetchData() {
            let { data: communityId } = await supabase.from('communities').select('id').eq('name', params['communityName']);
            communityId = communityId[0]['id'];

            const { data: data } = await supabase.from('posts').select(`
            id,
            authorId,
            communityId,
            title,
            content,
            profiles (username)
            `).eq('communityId', communityId);
            console.log(data);

            if (data) {
                setPosts(data);
            }
        }
        fetchData();
    }, []);

    return (<>
        <hr />
        {posts == null || posts.length === 0 ?
            <div className="flex h-screen">
                <div className="card m-auto w-96 bg-base-100 shadow-xl shadow-secondary hover:shadow-primary hover:cursor-pointer">
                    <div className="card-body">
                        <h2 className="card-title">Oops!</h2>
                        <p>Looks like there are no posts here</p>

                        <div className="card-actions justify-end">
                            <button onClick={() => router.push('/')} className="btn btn-primary">Go Back</button>
                        </div>
                    </div>
                </div>
            </div>
            : <></>
        }

        {posts &&
            <>
                {posts.map(post => {
                    return <Post post={post} key={post.id} params={params} />;
                })}
            </>
        }
    </>);
}