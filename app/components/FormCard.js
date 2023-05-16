"use client";

import { useEffect, useState } from "react";
import { useSupabase } from "./supabase-provider";

export default function FormCard() {
    const { supabase } = useSupabase();

    const [communityName, setCommunityName] = useState('');
    const [communityAbout, setCommunityAbout] = useState('');

    const [hideForm, setHideForm] = useState(true);
    const [cardClasses, setCardClasses] = useState('card w-96 bg-base-100 shadow-xl shadow-secondary mb-12 hover:cursor-pointer');

    useEffect(() => {
        const classes = 'card w-96 bg-base-100 shadow-xl shadow-secondary hover:shadow-success mb-12 hover:cursor-pointer';
        if (hideForm) {
            setCardClasses(classes);
        } else {
            setCardClasses(classes + ' hidden');
        }
    }, [hideForm]);

    const handleSave = async () => {
        const { data: session } = await supabase.auth.getSession();
        console.log(session);
        if (!session.session) {
            alert("Login First!");
        } else {
            const { data, error } = await supabase.from("communities").insert([
                {
                    name: communityName,
                    about: communityAbout
                }
            ]);

            if (error) {
                console.error(error);
            }

            setHideForm(true);
        }
    }

    const handleCancel = () => {
        setHideForm(true);
    }
    return (
        <div>
            <div className={cardClasses}>
                <div className="card-body">
                    <div><label onClick={() => setHideForm(false)} htmlFor="my-modal-3" className="btn card-title">+</label></div>
                    <p>Create a new community</p>
                </div>
            </div>

            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label onClick={handleCancel} htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">Create Community</h3>
                    <div>
                        <input onChange={(e) => setCommunityName(e.target.value.replace(' ', '-'))} value={communityName} type="text" placeholder="Community Name" className="input input-ghost focus:input-secondary w-full max-w-xs" />
                    </div>
                    <div>
                        <textarea onChange={(e) => setCommunityAbout(e.target.value)} value={communityAbout} className="textarea textarea-ghost focus:textarea-secondary" placeholder="About your community"></textarea>
                    </div>

                    <div className="modal-action">
                        <button onClick={handleSave} className="btn btn-outline btn-success">save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}