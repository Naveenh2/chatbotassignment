// import express from 'express'
// import cors from 'cors';
// import {getMockResponse,sessions, sessionList} from './mockData.js';
// const app=express();
// const PORT =5000;

// app.use(cors())
// app.use(express.json());




// app.post('/api/chat/new',(req,res)=>{
//     const sessionId=`session-${Date.now()}`;
//     const title="New Chat";
//     sessionList.push({id:sessionId,title});
//     sessions.set(sessionId,[]);

//     res.json({sessionId,title});
// });




// app.get('/api/sessions',(req,res)=>{
//     res.json(sessionList);
// })


// app.get('/api/chat/:sessionId', (req,res)=>{
//     const {sessionId}=req.params;
//     const history=sessions.get(sessionId);
//     if(history){
//         res.json(history);
//     }else{
//         res.status(404).json({message:"Session not found"});
//     }
// });


// app.post('/api/chat/:sessionId',(req,res)=>{
//     const {sessionId}=req.params;
//     const {prompt}=req.body;

//     const history=sessions.get(sessionId);
//     if(!history){
//         return res.status(404).json({message:"Session not found"});
//     }

//     const userMessage={sender:'user',text:prompt};
//     history.push(userMessage);

//     const botResponseData=getMockResponse(prompt);
//     const botMessage={
//         sender:'bot',
//         id:`msg-${Date.now()}`,
//         ...botResponseData,
//     };
//     history.push(botMessage);
//     const sessionInfo=sessionList.find(s=>s.id===sessionId);
//     if(sessionInfo && history.length===2){
//         sessionInfo.title=prompt.substring(0,30)+"...";
//     }

//     res.json(botMessage);
// });

// app.listen(PORT,()=>{
//     console.log(`Backend server running on http://localhost:${PORT}`);
// });



// backend/server.js
import express from 'express';
import cors from 'cors';
import { getMockResponse, sessions, sessionList } from './mockData.js';

const app = express();

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// --- API Endpoints ---

// 1. Start a new chat session
app.post('/api/chat/new', (req, res) => {
  const sessionId = `session-${Date.now()}`; // Generate unique session ID
  const title = "New Chat";
  
  sessionList.push({ id: sessionId, title });
  sessions.set(sessionId, []); // Initialize empty chat history
  
  res.json({ sessionId, title });
});

// 2. Get all sessions for the sidebar
app.get('/api/sessions', (req, res) => {
  res.json(sessionList.reverse()); // Show newest first
});

// 3. Get chat history for a specific session
app.get('/api/chat/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const history = sessions.get(sessionId);
  
  if (history) {
    res.json(history);
  } else {
    res.status(404).json({ message: "Session not found" });
  }
});

// 4. Post a new message to a session
app.post('/api/chat/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const { prompt } = req.body;

  const history = sessions.get(sessionId);
  if (!history) {
    return res.status(404).json({ message: "Session not found" });
  }

  // 1. Add user's message to history
  const userMessage = { sender: 'user', text: prompt };
  history.push(userMessage);

  // 2. Generate and add bot's response
  const botResponseData = getMockResponse(prompt);
  const botMessage = {
    sender: 'bot',
    id: `msg-${Date.now()}`,
    ...botResponseData,
  };
  history.push(botMessage);
  
  // Bonus: Update session title based on first prompt
  const sessionInfo = sessionList.find(s => s.id === sessionId);
  if (sessionInfo && history.length === 2) { // 2 messages = 1 user, 1 bot
    sessionInfo.title = prompt.substring(0, 30) + "..."; // Generate a simple title
  }

  // 3. Send back just the new bot message (the frontend will append it)
  res.json(botMessage);
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});