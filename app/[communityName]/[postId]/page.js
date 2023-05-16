"use client"

import { useSupabase } from "@/app/components/supabase-provider";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Replies({ comment, supabase }) {
    const [replies, setReplies] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const { data } = await supabase.from('commentreplies').select(`
            id,
            authorId,
            repliedTo,
            content,
            profiles (username)
            `).eq('repliedTo', comment.id);
            setReplies(data);
        }

        fetchData();
    }, []);
    return (
        <div className="ml-12">
            {replies &&
                <>
                    {replies.map(reply => {
                        return (
                            <div key={reply.id} className="card mb-8 bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <div>
                                        <h2 className="card-title text-info">{reply.profiles.username}</h2>
                                        {/* <h3 className="font-bold text-primary">{reply.content}</h3> */}
                                    </div>
                                    <p>{reply.content}</p>
                                </div>
                            </div>
                        );
                    })}
                </>
            }
        </div>
    );
}

function Comment({ params, comment, supabase, session }) {
    const [replyContent, setReplyContent] = useState(undefined);
    const [hideReplyBtn, setHideReplyBtn] = useState(false);

    const handleSave = async () => {
        if (!session) {
            alert('Login First!');
            console.error("NOT LOGGED IN", session);
        } else {

            console.log(replyContent);
            const { data, error } = await supabase.from('commentreplies').insert([
                {
                    // id: crypto.randomUUID(),
                    authorId: session.user.id,
                    repliedTo: comment.id,
                    content: replyContent
                }
            ]);
            if (error) {
                console.log(error)
            }
            setReplyContent('');
        }


    }

    const handleCancel = () => {
        setHideReplyBtn(false);
        setReplyContent('');
    }

    return (<>
        <div key={comment.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-accent">{comment.profiles.username}</h2>
                <p>{comment.content}</p>
                {hideReplyBtn ?
                    <></>
                    :
                    <div className="card-actions justify-end" onClick={() => setHideReplyBtn(true)}>
                        <button className="btn btn-success btn-sm">reply</button>
                    </div>

                }
                {!hideReplyBtn ?
                    <></>
                    :
                    <div >
                        <textarea onChange={(e) => setReplyContent(e.target.value)} value={replyContent} placeholder="Your Reply..." className="textarea textarea-ghost" />

                        <div className="flex w-64 justify-between">
                            <button onClick={handleSave}>save</button>
                            <button onClick={handleCancel}>cancel</button>
                        </div>
                    </div>
                }
            </div>

        </div>
        <div className="mx-auto">
            <Replies comment={comment} supabase={supabase} />
        </div>
    </>
    );
}

export default function () {
    const params = useParams();
    const { supabase } = useSupabase();
    const [comments, setComments] = useState(null);
    const [post, setPost] = useState(null);
    const [session, setSession] = useState(undefined);
    const [replyContent, setReplyContent] = useState(undefined);
    const [hideReplyBtn, setHideReplyBtn] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const { data: session } = await supabase.auth.getSession();
            setSession(session.session);

            const { data } = await supabase.from('posts').select(`
            id,
            authorId,
            communityId,
            title,
            content,
            profiles (username)
            `).eq('id', params.postId);
            setPost(data);

            const { data: comments } = await supabase.from('comments').select(`
            id,
            authorId,
            content,
            profiles (username)
            `).eq('repliedTo', params.postId);
            setComments(comments);
        }
        fetchData();
    }, []);

    const handleSave = async () => {
        if (!session) {
            alert('Login First!');
            console.error("NOT LOGGED IN", session);
        } else {

            console.log(replyContent);
            const { data, error } = await supabase.from('comments').insert([
                {
                    authorId: session.user.id,
                    repliedTo: post[0].id,
                    content: replyContent
                }
            ]);
            if (error) {
                console.log(error)
            }
            setReplyContent('');
        }


    }

    const handleCancel = () => {
        setHideReplyBtn(false);
        setReplyContent('');
    }

    return (<>
        <hr />
        <div className="mx-auto">
            {post &&
                <div className="card mb-12 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div>
                            <h2 className="card-title">{post[0].title}</h2>
                            <h3 className="font-bold text-primary">{post[0].profiles.username}</h3>
                        </div>
                        <p>{post[0].content && post[0].content}</p>

                        {hideReplyBtn ?
                            <></>
                            :
                            <div className="card-actions justify-end" onClick={() => setHideReplyBtn(true)}>
                                <button className="btn btn-success btn-sm">reply</button>
                            </div>

                        }
                        {!hideReplyBtn ?
                            <></>
                            :
                            <div >
                                <textarea onChange={(e) => setReplyContent(e.target.value)} value={replyContent} placeholder="Your Reply..." className="textarea textarea-ghost" />

                                <div className="flex w-64 justify-between">
                                    <button onClick={handleSave}>save</button>
                                    <button onClick={handleCancel}>cancel</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }

            <div className="ml-12">
                {comments &&

                    <>
                        {comments.map(comment => {
                            return <Comment key={comment.id} params={params} comment={comment} supabase={supabase} session={session} />
                        })}
                    </>

                }
            </div>
        </div>
    </>);
}