import * as React from 'react';

export default function ThreadCard() {
    const topic = "Should I major in CS?"
    const description = "Job market for the tech industry is bad and unpredictable for the future. Is there anyway that majoring in computer science, starting now, still a good idea? I am making a Side Nav in React using tailwind css I have to add border-red color when a particular link is selected. So I am using this approach But this is not working Can anyone help me here"
    const username = "CAT IS NOT SODIUM"
    const likes = 10;
    const views = 20;
    const comments = 3;
    const status = "5 hrs ago"
    const tags = ["RANT", "STUDIES"]
    return (
        <div className='flex flex-col w-full text-left '>
            <div className='text-xs'>
                {username} 
                {"  : "}
                <span className='font-bold'>
                    {status}
                </span>
            </div>
            
            <div className='text-xl font-bold'>
                {topic}
            </div>
            <div className='flex flex-row text-xs gap-2'>
                {tags.map((tag) => {
                    return (<div className="w-fit px-2 rounded-full py-1  bg-gray-200">
                        {tag}
                    </div>)
                })}
            </div>
            <div className='text-sm text-gray-500 '>
                {description}
            </div>
            <div className='text-sm'>
                {" ▲ " + likes}{" 👁 " + views}{" 💬 " + comments}
            </div>
            <hr className='my-4'/>
        </div>
    )
}