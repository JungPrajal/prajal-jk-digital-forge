import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeSnippet {
  language: string;
  filename: string;
  code: string[];
  theme: {
    keyword: string;
    string: string;
    comment: string;
    function: string;
    variable: string;
  };
}

const AnimatedCodeEditor = () => {
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayedCode, setDisplayedCode] = useState<string[]>([]);

  const codeSnippets: CodeSnippet[] = [
    {
      language: 'Python/Django',
      filename: 'portfolio_api.py',
      code: [
        "from django.shortcuts import render",
        "from rest_framework.decorators import api_view",
        "from rest_framework.response import Response",
        "",
        "@api_view(['GET'])",
        "def get_portfolio_data(request):",
        "    # Fetch developer portfolio information",
        "    portfolio = {",
        "        'name': 'Prajal Jung Kunwar',",
        "        'role': 'AI/ML Developer',",
        "        'skills': ['Python', 'Django', 'ML'],",
        "        'projects': fetch_latest_projects(),",
        "    }",
        "    return Response(portfolio)"
      ],
      theme: {
        keyword: 'text-blue-400',
        string: 'text-green-400',
        comment: 'text-gray-500',
        function: 'text-yellow-400',
        variable: 'text-purple-400'
      }
    },
    {
      language: 'Flutter/Dart',
      filename: 'portfolio_app.dart',
      code: [
        "import 'package:flutter/material.dart';",
        "import 'package:http/http.dart' as http;",
        "",
        "class PortfolioScreen extends StatelessWidget {",
        "  @override",
        "  Widget build(BuildContext context) {",
        "    return Scaffold(",
        "      appBar: AppBar(",
        "        title: Text('Prajal JK Portfolio'),",
        "        backgroundColor: Colors.deepPurple,",
        "      ),",
        "      body: FutureBuilder(",
        "        future: fetchPortfolioData(),",
        "        builder: (context, snapshot) =>",
        "          PortfolioContent(data: snapshot.data),",
        "      ),",
        "    );",
        "  }",
        "}"
      ],
      theme: {
        keyword: 'text-purple-400',
        string: 'text-green-400',
        comment: 'text-gray-500',
        function: 'text-cyan-400',
        variable: 'text-orange-400'
      }
    },
    {
      language: 'React/JavaScript',
      filename: 'Portfolio.jsx',
      code: [
        "import React, { useState, useEffect } from 'react';",
        "import { motion } from 'framer-motion';",
        "",
        "const Portfolio = () => {",
        "  const [projects, setProjects] = useState([]);",
        "  const [loading, setLoading] = useState(true);",
        "",
        "  useEffect(() => {",
        "    // Fetch portfolio projects",
        "    fetchProjects().then(data => {",
        "      setProjects(data);",
        "      setLoading(false);",
        "    });",
        "  }, []);",
        "",
        "  return (",
        "    <motion.div className='portfolio-container'",
        "      initial={{ opacity: 0 }}",
        "      animate={{ opacity: 1 }}>",
        "      <ProjectGrid projects={projects} />",
        "    </motion.div>",
        "  );",
        "};"
      ],
      theme: {
        keyword: 'text-cyan-400',
        string: 'text-green-400',
        comment: 'text-gray-500',
        function: 'text-yellow-400',
        variable: 'text-blue-400'
      }
    },
    {
      language: 'PHP/Laravel',
      filename: 'PortfolioController.php',
      code: [
        "<?php",
        "",
        "namespace App\\Http\\Controllers;",
        "use Illuminate\\Http\\Request;",
        "use App\\Models\\Project;",
        "",
        "class PortfolioController extends Controller",
        "{",
        "    public function index(Request $request)",
        "    {",
        "        // Get all portfolio projects",
        "        $projects = Project::where('featured', true)",
        "                          ->orderBy('created_at', 'desc')",
        "                          ->get();",
        "",
        "        return response()->json([",
        "            'success' => true,",
        "            'data' => $projects,",
        "            'message' => 'Portfolio loaded successfully'",
        "        ]);",
        "    }",
        "}"
      ],
      theme: {
        keyword: 'text-pink-400',
        string: 'text-green-400',
        comment: 'text-gray-500',
        function: 'text-yellow-400',
        variable: 'text-blue-400'
      }
    },
    {
      language: 'Node.js/Express',
      filename: 'portfolio-routes.js',
      code: [
        "const express = require('express');",
        "const router = express.Router();",
        "const Portfolio = require('../models/Portfolio');",
        "",
        "// GET /api/portfolio - Fetch portfolio data",
        "router.get('/portfolio', async (req, res) => {",
        "  try {",
        "    const portfolioData = await Portfolio.findOne({",
        "      owner: 'Prajal Jung Kunwar'",
        "    }).populate('projects skills');",
        "",
        "    res.status(200).json({",
        "      success: true,",
        "      data: portfolioData,",
        "      timestamp: new Date().toISOString()",
        "    });",
        "  } catch (error) {",
        "    res.status(500).json({",
        "      success: false,",
        "      message: error.message",
        "    });",
        "  }",
        "});",
        "",
        "module.exports = router;"
      ],
      theme: {
        keyword: 'text-green-400',
        string: 'text-yellow-400',
        comment: 'text-gray-500',
        function: 'text-cyan-400',
        variable: 'text-purple-400'
      }
    }
  ];

  const currentSnippet = codeSnippets[currentLanguageIndex];

  const getLineWithSyntaxHighlighting = useCallback((line: string, theme: any) => {
    // Enhanced syntax highlighting
    return line
      .replace(/(import|from|class|def|function|const|let|var|if|else|for|while|try|catch|async|await|return|export|default|extends|implements|public|private|protected|static|final|abstract|interface|enum|namespace|use|require|include|echo|print|new|this|self|super|\$|@override|override)/g, 
        `<span class="${theme.keyword}">$1</span>`)
      .replace(/(['"`])((?:(?!\1)[^\\]|\\.)*)(\1)/g, 
        `<span class="${theme.string}">$1$2$3</span>`)
      .replace(/(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$|<!--[\s\S]*?-->)/g, 
        `<span class="${theme.comment}">$1</span>`)
      .replace(/\b([A-Z][a-zA-Z0-9_]*|[a-z_][a-zA-Z0-9_]*)\s*\(/g, 
        `<span class="${theme.function}">$1</span>(`)
      .replace(/\$([a-zA-Z_][a-zA-Z0-9_]*)/g, 
        `<span class="${theme.variable}">$$1</span>`);
  }, []);

  useEffect(() => {
    const typewriterSpeed = 50; // milliseconds per character
    const pauseAfterComplete = 1500; // pause when snippet is complete
    const transitionTime = 500; // time between snippets

    if (isTyping) {
      const timer = setTimeout(() => {
        const currentLine = currentSnippet.code[currentLineIndex];
        
        if (currentLine && currentCharIndex < currentLine.length) {
          // Continue typing current line
          const newDisplayedCode = [...displayedCode];
          if (!newDisplayedCode[currentLineIndex]) {
            newDisplayedCode[currentLineIndex] = '';
          }
          newDisplayedCode[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
          setDisplayedCode(newDisplayedCode);
          setCurrentCharIndex(prev => prev + 1);
        } else if (currentLineIndex < currentSnippet.code.length - 1) {
          // Move to next line
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        } else {
          // Finished typing current snippet
          setIsTyping(false);
          setTimeout(() => {
            // Move to next language
            setCurrentLanguageIndex(prev => (prev + 1) % codeSnippets.length);
            setCurrentLineIndex(0);
            setCurrentCharIndex(0);
            setDisplayedCode([]);
            setIsTyping(true);
          }, pauseAfterComplete);
        }
      }, typewriterSpeed);

      return () => clearTimeout(timer);
    }
  }, [currentLanguageIndex, currentLineIndex, currentCharIndex, isTyping, displayedCode, currentSnippet]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <motion.div 
        className="relative transform perspective-1000"
        initial={{ rotateX: 5, rotateY: -10 }}
        animate={{ rotateX: 0, rotateY: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* macOS Window Frame */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
          {/* Window Header */}
          <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"></div>
            </div>
            
            <div className="flex items-center gap-4">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={currentLanguageIndex}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-gray-300 text-sm font-medium"
                >
                  {currentSnippet.filename}
                </motion.span>
              </AnimatePresence>
              
              <div className="flex items-center gap-2">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-purple-500"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
                <span className="text-xs text-gray-400">{currentSnippet.language}</span>
              </div>
            </div>
          </div>

          {/* Code Content */}
          <div className="bg-gray-900 p-6 font-mono text-sm min-h-[400px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLanguageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-1"
              >
                {currentSnippet.code.map((line, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-gray-500 mr-4 select-none w-8 text-right">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 text-gray-300 min-h-[1.25rem]">
                      {index <= currentLineIndex && (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: getLineWithSyntaxHighlighting(
                              displayedCode[index] || '', 
                              currentSnippet.theme
                            )
                          }}
                        />
                      )}
                      {index === currentLineIndex && isTyping && (
                        <motion.span
                          className="inline-block w-2 h-5 bg-green-400 ml-1"
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
            
            {/* Ambient Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>
        
        {/* Floating Language Indicator */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLanguageIndex}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="absolute -bottom-4 left-6 bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-full text-xs font-medium shadow-lg"
          >
            {currentSnippet.language}
          </motion.div>
        </AnimatePresence>
        
        {/* Decorative Elements */}
        <motion.div 
          className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500/30 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360] 
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        ></motion.div>
        <motion.div 
          className="absolute -bottom-3 -left-3 w-4 h-4 bg-cyan-500/30 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedCodeEditor;