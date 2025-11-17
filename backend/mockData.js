const getMockResponse=(prompt)=>{
    const lowerPrompt=prompt.toLowerCase();
    if(lowerPrompt.includes("marketing stratagies")){
        return {
            description:"Here are some top marketing stratagies for 2025:",
            table:{
                headers:["Strategy","Description","KPI"],
                rows:[
                    ["Content Marketing","Creating valuable content","Engagement"],
                    ["SEO","Optimizing for search engines","Organic Traffic"],
                    ["PPC Advertising","Paid search ads","Conversion Rate"],
                ],
            },
        };
    }
    if(lowerPrompt.includes("trip to japan")){
        return{
            description:"A sample 7-day itinerary for a trip to japan:",
            table:{
                headers:["Day","Location","Activity"],
                rows:[
                    ["1-2","Tokyo","Shibuya Crossing, Senso-ji Temple"],
                    ["3-4","Kyoto","Kinkaku, Fushimi Inari Shrine"],
                    ["5","Osaka","Osaka Castle, Dotonbori"],
                    ["6-7","Tokyo","Shopping, Return flight"],
                ],
            },
        };
    }
    return{
        description:`I don't have specfic data for "${prompt}" but here is some generic information.`,
        table:{
            headers:["Column A","Column B"],
            rows:[
                [ "Data 1","Data 2"],
                ["Data 3","Data 4"],
            ],
        },
    };
};
const sessions=new Map();
const sessionList=[];
export {getMockResponse,sessions,sessionList};