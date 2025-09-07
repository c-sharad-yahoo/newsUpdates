import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, BookOpen, Target, TrendingUp, Brain, Globe, BarChart3, Lightbulb } from 'lucide-react';
import { useArticles } from '../hooks/useArticles';

const ArticleDetail: React.FC = () => {
  const { year, month, id } = useParams<{ year: string; month: string; id: string }>();
  const { articles, loading: isLoading, error } = useArticles();
  
  const article = articles.find(a => a.id === id) || null;

  const currentIndex = articles.findIndex(a => a.id === id);
  const previousArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  const capitalizeMonth = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-4">The article you're looking for doesn't exist or may have been moved.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareTitle = article.title;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  // Check if article has new JSON structure
  const hasNewStructure = article.impact_summary && article.primary_focus;

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-background)' }}>
      <div className="apple-container">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/${year}/${month}`} className="hover:text-blue-600 transition-colors">
            {capitalizeMonth(month || '')} {year?.charAt(0).toUpperCase() + year?.slice(1)}
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Article</span>
        </nav>

        {/* Article Header */}
        <div className="apple-header">
          <h1 className="apple-title">{article.title}</h1>
          <p className="apple-subtitle">
            {new Date(article.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })} - Comprehensive Update for Competitive Exam Preparation
          </p>
          
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>{article.readingTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>{article.category}</span>
            </div>
            {article.meta?.word_count && (
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>{article.meta.word_count} words</span>
              </div>
            )}
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {hasNewStructure ? (
          <>
            {/* Impact Summary */}
            {article.impact_summary && (
              <div className="impact-summary">
                <h3>📊 Daily Impact Assessment</h3>
                <div className="impact-grid">
                  <div className="impact-item">
                    <span className="impact-number">{article.impact_summary.policy_developments}</span>
                    <span className="impact-label">Policy Developments</span>
                  </div>
                  <div className="impact-item">
                    <span className="impact-number">{article.impact_summary.international_updates}</span>
                    <span className="impact-label">International Updates</span>
                  </div>
                  <div className="impact-item">
                    <span className="impact-number">{article.impact_summary.economic_indicators}</span>
                    <span className="impact-label">Economic Indicators</span>
                  </div>
                  <div className="impact-item">
                    <span className="impact-number">{article.impact_summary.scientific_advances}</span>
                    <span className="impact-label">Scientific Advances</span>
                  </div>
                </div>
              </div>
            )}

            {/* Primary Focus */}
            {article.primary_focus && (
              <div className="primary-focus">
                <h2 className="primary-focus-title">
                  <Target className="inline w-6 h-6 mr-2 text-orange-500" />
                  🔥 Primary Focus: {article.primary_focus.title}
                </h2>
                
                {article.primary_focus.category && (
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {article.primary_focus.category}
                    </span>
                  </div>
                )}
                
                <div className="primary-focus-summary">
                  {article.primary_focus.summary}
                </div>
                
                <div className="article-content">
                  {(article.primary_focus.content || '').split('\n').map((paragraph, index) => (
                    paragraph.trim() && <p key={index}>{paragraph}</p>
                  ))}
                </div>
                
                {/* Multi-dimensional Impact */}
                {article.primary_focus.multi_dimensional_impact && (
                  <div className="multi-impact">
                    <div className="multi-impact-title">
                      <Globe className="inline w-5 h-5 mr-2 text-green-600" />
                      Multi-Dimensional Impact
                    </div>
                    <div className="multi-impact-content">{article.primary_focus.multi_dimensional_impact}</div>
                  </div>
                )}
                
                {/* Historical Context */}
                {article.primary_focus.historical_context && (
                  <div className="historical-context">
                    <div className="historical-context-title">
                      <Clock className="inline w-5 h-5 mr-2 text-purple-600" />
                      Historical Context
                    </div>
                    <div className="historical-context-content">{article.primary_focus.historical_context}</div>
                  </div>
                )}
                
                {/* Future Implications */}
                {article.primary_focus.future_implications && (
                  <div className="future-implications">
                    <div className="future-implications-title">
                      <TrendingUp className="inline w-5 h-5 mr-2 text-indigo-600" />
                      Future Implications
                    </div>
                    <div className="future-implications-content">{article.primary_focus.future_implications}</div>
                  </div>
                )}
                
                {article.primary_focus.key_terms && article.primary_focus.key_terms.length > 0 && (
                  <div className="key-terms">
                    {article.primary_focus.key_terms.map((term, index) => (
                      <span key={index} className="key-term">{term}</span>
                    ))}
                  </div>
                )}
                
                {article.primary_focus.exam_relevance && (
                  <div className="exam-relevance">
                    <div className="exam-relevance-title">🎯 Exam Relevance</div>
                    <div>{article.primary_focus.exam_relevance}</div>
                  </div>
                )}
                
                {article.primary_focus.citations && article.primary_focus.citations.length > 0 && (
                  <div className="citations">
                    Citations: {article.primary_focus.citations.map((citation, index) => (
                      <span key={index} className="citation">[{citation}]</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Sections */}
            {article.sections && article.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="section">
                <div className="section-header">
                  <h2 className="section-title">{section.title}</h2>
                  <p className="section-summary">{section.summary}</p>
                </div>
                
                {section.articles && section.articles.map((sectionArticle, articleIndex) => (
                  <div key={articleIndex} className="article">
                    <h3 className="article-title">{sectionArticle.title}</h3>
                    <div className="article-summary">{sectionArticle.summary}</div>
                    
                    {/* Dynamic Content Rendering */}
                    {(() => {
                      const excludedKeys = ['title', 'summary', 'key_terms', 'citations', 'content'];
                      const contentKeys = Object.keys(sectionArticle).filter(key => 
                        !excludedKeys.includes(key) && 
                        typeof sectionArticle[key] === 'string' && 
                        sectionArticle[key]?.trim()
                      );
                      
                      return contentKeys.map((key, index) => {
                        // Convert snake_case to Title Case
                        const title = key
                          .split('_')
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(' ');
                        
                        return (
                          <div key={index} className="dynamic-content-section">
                            <h4 className="dynamic-content-title">📄 {title}</h4>
                            <div className="dynamic-content-body">{sectionArticle[key] as string}</div>
                          </div>
                        );
                      });
                    })()}
                    
                    {/* Legacy content field */}
                    {sectionArticle.content && (
                      <div className="article-content">
                        {(sectionArticle.content || '').split('\n').map((paragraph, index) => (
                          paragraph.trim() && <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    )}
                    
                    {sectionArticle.key_terms && sectionArticle.key_terms.length > 0 && (
                      <div className="key-terms">
                        {sectionArticle.key_terms.map((term, index) => (
                          <span key={index} className="key-term">{term}</span>
                        ))}
                      </div>
                    )}
                    
                    {sectionArticle.citations && sectionArticle.citations.length > 0 && (
                      <div className="citations">
                        Citations: {sectionArticle.citations.map((citation, index) => (
                          <span key={index} className="citation">[{citation}]</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* Rapid Updates */}
            {article.rapid_updates && article.rapid_updates.length > 0 && (
              <div className="rapid-updates">
                <h2 className="rapid-updates-title">⚡ Rapid Intelligence Updates</h2>
                {article.rapid_updates.map((update, index) => (
                  <div key={index} className="rapid-update">
                    <div className="rapid-update-category">{update.category}</div>
                    <div>{update.content}</div>
                    {update.citations && update.citations.length > 0 && (
                      <div className="citations">
                        {update.citations.map((citation, citIndex) => (
                          <span key={citIndex} className="citation">[{citation}]</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Exam Intelligence */}
            {article.exam_intelligence && (
              <div className="exam-intelligence">
                <h2 className="exam-intelligence-title">
                  <Brain className="inline w-6 h-6 mr-2 text-purple-600" />
                  🧠 Exam Intelligence Toolkit
                </h2>
                
                {article.exam_intelligence.new_concepts && (
                  <div className="exam-section">
                    <h3 className="exam-section-title">
                      <Lightbulb className="inline w-5 h-5 mr-2 text-yellow-600" />
                      New Concepts Learned
                    </h3>
                    <div className="exam-section-content">{article.exam_intelligence.new_concepts}</div>
                  </div>
                )}
                
                {article.exam_intelligence.static_dynamic_connections && (
                  <div className="exam-section">
                    <h3 className="exam-section-title">
                      <Globe className="inline w-5 h-5 mr-2 text-green-600" />
                      Static-Dynamic Connections
                    </h3>
                    <div className="exam-section-content">{article.exam_intelligence.static_dynamic_connections}</div>
                  </div>
                )}
                
                {article.exam_intelligence.question_probability && (
                  <div className="exam-section">
                    <h3 className="exam-section-title">
                      <Target className="inline w-5 h-5 mr-2 text-red-600" />
                      Question Probability Analysis
                    </h3>
                    <div className="exam-section-content">{article.exam_intelligence.question_probability}</div>
                  </div>
                )}
                
                {article.exam_intelligence.factual_database && (
                  <div className="exam-section">
                    <h3 className="exam-section-title">
                      <BarChart3 className="inline w-5 h-5 mr-2 text-blue-600" />
                      Factual Database
                    </h3>
                    <div className="exam-section-content">{article.exam_intelligence.factual_database}</div>
                  </div>
                )}
                
                {article.exam_intelligence.comparative_analysis && (
                  <div className="exam-section">
                    <h3 className="exam-section-title">
                      <TrendingUp className="inline w-5 h-5 mr-2 text-indigo-600" />
                      Comparative Analysis
                    </h3>
                    <div className="exam-section-content">{article.exam_intelligence.comparative_analysis}</div>
                  </div>
                )}
              </div>
            )}

            {/* Knowledge Synthesis */}
            {article.knowledge_synthesis && (
              <div className="exam-intelligence">
                <h2 className="exam-intelligence-title">
                  <Brain className="inline w-6 h-6 mr-2 text-green-600" />
                  🔗 Knowledge Synthesis
                </h2>
                
                {Object.entries(article.knowledge_synthesis).map(([key, value]) => {
                  if (!value || typeof value !== 'string') return null;
                  
                  const title = key
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                  
                  return (
                    <div key={key} className="exam-section">
                      <h3 className="exam-section-title">
                        <Globe className="inline w-5 h-5 mr-2 text-green-600" />
                        {title}
                      </h3>
                      <div className="exam-section-content">{value}</div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Weekly Analysis */}
            {article.weekly_analysis && (
              <div className="exam-intelligence">
                <h2 className="exam-intelligence-title">
                  <TrendingUp className="inline w-6 h-6 mr-2 text-blue-600" />
                  📊 Weekly Analysis
                </h2>
                
                {Object.entries(article.weekly_analysis).map(([key, value]) => {
                  if (!value || typeof value !== 'string') return null;
                  
                  const title = key
                    .split('_')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                  
                  return (
                    <div key={key} className="exam-section">
                      <h3 className="exam-section-title">
                        <BarChart3 className="inline w-5 h-5 mr-2 text-blue-600" />
                        {title}
                      </h3>
                      <div className="exam-section-content">{value}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          // Legacy content rendering for backward compatibility
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-200">
            <div className="prose prose-lg prose-blue max-w-none prose-headings:text-gray-900 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700" 
                 dangerouslySetInnerHTML={{ __html: article.content || '' }} />
          </div>
        )}

        {/* Navigation */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            {previousArticle ? (
              <Link
                to={`/${previousArticle.year.toLowerCase()}/${previousArticle.month.toLowerCase()}/${previousArticle.id}`}
                className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-sm font-medium">Previous Article</div>
                  <div className="text-sm line-clamp-1">{previousArticle.title}</div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}

            {nextArticle && (
              <Link
                to={`/${nextArticle.year.toLowerCase()}/${nextArticle.month.toLowerCase()}/${nextArticle.id}`}
                className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors group text-right"
              >
                <div>
                  <div className="text-sm font-medium">Next Article</div>
                  <div className="text-sm line-clamp-1">{nextArticle.title}</div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;