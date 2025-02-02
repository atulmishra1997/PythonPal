import React, { useState } from 'react';
import { Bot, Send, Settings, Trophy, Code, Play, Star, Award } from 'lucide-react';
import Editor from '@monaco-editor/react';

type Character = {
  name: string;
  avatar: string;
  description: string;
};

type Challenge = {
  id: number;
  title: string;
  description: string;
  initialCode: string;
  solution: string;
  completed: boolean;
};

function App() {
  const [message, setMessage] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [code, setCode] = useState('print("Hello, Python!")');
  const [showPlayground, setShowPlayground] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>({
    name: 'Py the Snake',
    avatar: 'https://images.unsplash.com/photo-1581321825690-944511645947?auto=format&fit=crop&q=80&w=100&h=100',
    description: 'A friendly python who loves to teach coding!'
  });
  const [achievements, setAchievements] = useState([
    { id: 1, title: 'First Code', description: 'Wrote your first Python code', earned: false },
    { id: 2, title: 'Bug Hunter', description: 'Fixed your first error', earned: false },
    { id: 3, title: 'Loop Master', description: 'Completed a loop challenge', earned: false },
  ]);
  const [challenges  ] = useState<Challenge[]>([
    {
      id: 1,
      title: 'Hello World',
      description: 'Print "Hello, World!" to the console',
      initialCode: '# Write your code here\n',
      solution: 'print("Hello, World!")',
      completed: false,
    },
    {
      id: 2,
      title: 'Simple Calculator',
      description: 'Create a function that adds two numbers',
      initialCode: 'def add_numbers(a, b):\n    # Your code here\n',
      solution: 'def add_numbers(a, b):\n    return a + b',
      completed: false,
    },
  ]);

  const characters: Character[] = [
    {
      name: 'Py the Snake',
      avatar: 'https://images.unsplash.com/photo-1581321825690-944511645947?auto=format&fit=crop&q=80&w=100&h=100',
      description: 'A friendly python who loves to teach coding!'
    },
    {
      name: 'Professor Binary',
      avatar: 'https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?auto=format&fit=crop&q=80&w=100&h=100',
      description: 'A wise robot who explains complex concepts simply'
    },
    {
      name: 'Data the Dragon',
      avatar: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?auto=format&fit=crop&q=80&w=100&h=100',
      description: 'A magical dragon who makes data structures fun!'
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: 'This is where the AI response would appear. Connect your preferred AI API to get real responses!' 
    }]);
    setMessage('');
  };

  const handleRunCode = () => {
    // In a real implementation, this would run the code and show output
    console.log('Running code:', code);
    if (!achievements[0].earned) {
      const newAchievements = [...achievements];
      newAchievements[0].earned = true;
      setAchievements(newAchievements);
    }
  };

  const handleChallengeSelect = (challenge: Challenge) => {
    setCode(challenge.initialCode);
    setShowPlayground(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Bot className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">PythonPal</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowPlayground(!showPlayground)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Code className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Settings className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Character Selection */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Choose Your Tutor</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {characters.map((character) => (
              <div
                key={character.name}
                onClick={() => setSelectedCharacter(character)}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedCharacter.name === character.name
                    ? 'bg-purple-100 border-2 border-purple-500'
                    : 'bg-white hover:bg-purple-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={character.avatar}
                    alt={character.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{character.name}</h4>
                    <p className="text-sm text-gray-600">{character.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Your Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-xl ${
                  achievement.earned ? 'bg-green-100' : 'bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {achievement.earned ? (
                    <Trophy className="h-6 w-6 text-green-600" />
                  ) : (
                    <Award className="h-6 w-6 text-gray-400" />
                  )}
                  <div>
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coding Challenges */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Coding Challenges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-white p-4 rounded-xl shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{challenge.title}</h4>
                  {challenge.completed && (
                    <Star className="h-5 w-5 text-yellow-400" />
                  )}
                </div>
                <p className="text-gray-600 mb-4">{challenge.description}</p>
                <button
                  onClick={() => handleChallengeSelect(challenge)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Start Challenge
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chat Interface */}
          <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <img
                      src={selectedCharacter.avatar}
                      alt={selectedCharacter.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything about Python!"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 flex items-center space-x-2"
                >
                  <span>Send</span>
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Code Playground */}
          {showPlayground && (
            <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
              <div className="p-4">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Code Playground</h3>
                  <div className="h-[400px] border rounded-lg overflow-hidden">
                    <Editor
                      height="100%"
                      defaultLanguage="python"
                      value={code}
                      onChange={(value) => setCode(value || '')}
                      theme="vs-light"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={handleRunCode}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center space-x-2"
                >
                  <Play className="h-4 w-4" />
                  <span>Run Code</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold mb-4">Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    API Key
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your API key"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;