import React from 'react';
import { Users, Target, Award, Heart, BookOpen, Globe } from 'lucide-react';
import NewsletterSignup from '../components/NewsletterSignup';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Daily Brief
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We're on a mission to make news accessible, educational, and engaging for students 
              and young professionals who want to stay informed without the overwhelm.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                In an age of information overload, we believe that staying informed shouldn't be 
                overwhelming. Daily Brief curates and analyzes the most important news stories, 
                presenting them in a format that's perfect for busy students and young professionals.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We focus on providing context, analysis, and educational value—not just headlines. 
                Every article is designed to help you understand not just what happened, but why 
                it matters and how it affects your world.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">What Makes Us Different</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Educational Focus</h4>
                    <p className="text-sm text-gray-600">We explain complex topics in accessible terms</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Time-Conscious</h4>
                    <p className="text-sm text-gray-600">Every article is designed to be read in 5 minutes or less</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Student-Centered</h4>
                    <p className="text-sm text-gray-600">Content tailored for academic and professional development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at Daily Brief.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Education First</h3>
              <p className="text-gray-600">
                We believe informed citizens make better decisions. Every article is designed to 
                educate and provide context beyond just the facts.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Over Quantity</h3>
              <p className="text-gray-600">
                We carefully curate and analyze the most important stories rather than overwhelming 
                you with every piece of news.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Student-Centric</h3>
              <p className="text-gray-600">
                Everything we create is designed with students and young professionals in mind, 
                from our writing style to our article length.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Daily Brief is created by a team of journalists, educators, and technology professionals 
              who are passionate about making news accessible to students worldwide.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Background</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our editorial team combines decades of experience in journalism, education, and 
                  student affairs. We understand the unique challenges students face in staying 
                  informed while managing their academic responsibilities.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We're supported by subject matter experts across technology, business, politics, 
                  science, and culture who help ensure our analysis is accurate and insightful.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Join Our Mission</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We're always looking for talented writers, editors, and contributors who share 
                  our passion for educational journalism.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">• Student Correspondents</p>
                  <p className="text-sm text-gray-600">• Subject Matter Experts</p>
                  <p className="text-sm text-gray-600">• Content Editors</p>
                  <p className="text-sm text-gray-600">• Social Media Managers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Since launching, Daily Brief has become a trusted source for students worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600 font-medium">Active Readers</div>
              <div className="text-sm text-gray-500 mt-1">Across 50+ countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Articles Published</div>
              <div className="text-sm text-gray-500 mt-1">With 4.8/5 average rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600 font-medium">Reader Satisfaction</div>
              <div className="text-sm text-gray-500 mt-1">Based on user surveys</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24</div>
              <div className="text-gray-600 font-medium">Months Running</div>
              <div className="text-sm text-gray-500 mt-1">Consistently daily updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </div>
  );
};

export default About;