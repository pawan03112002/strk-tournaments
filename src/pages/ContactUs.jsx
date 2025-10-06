import { motion } from 'framer-motion'
import { Mail, MessageSquare, HelpCircle, Shield, DollarSign, Trophy } from 'lucide-react'

const ContactUs = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-4">
              <Mail className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Contact Us</h1>
            <p className="text-gray-400">We're here to help! Reach out for any queries.</p>
          </div>

          <div className="space-y-6 text-gray-300">
            {/* Primary Contact */}
            <section className="p-6 bg-gradient-to-r from-red-500/20 to-orange-500/20 border-2 border-red-500/50 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Mail className="w-6 h-6 text-red-500" />
                Official Support Email
              </h2>
              <a 
                href="mailto:strk.tournaments@gmail.com" 
                className="text-3xl font-bold text-red-400 hover:text-red-300 underline block mb-3"
              >
                strk.tournaments@gmail.com
              </a>
              <p className="text-gray-300">
                For all inquiries, please email us with your registered email address and tournament details. 
                We typically respond within <strong>24-48 hours</strong>.
              </p>
            </section>

            {/* What to Include */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-green-500" />
                What to Include in Your Email
              </h2>
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="mb-3">To help us assist you quickly, please include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Subject Line:</strong> Brief description of your issue (e.g., "Payment Issue - Team #1234")</li>
                  <li><strong>Registered Email:</strong> The email you used for registration</li>
                  <li><strong>Team Name & Number:</strong> If you've already registered</li>
                  <li><strong>Transaction ID:</strong> For payment-related queries</li>
                  <li><strong>Screenshots:</strong> Attach relevant screenshots if applicable</li>
                  <li><strong>Detailed Description:</strong> Explain your issue clearly</li>
                </ul>
              </div>
            </section>

            {/* Common Query Types */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-purple-500" />
                What We Can Help With
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Registration Issues */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <h3 className="font-bold text-white">Registration Issues</h3>
                  </div>
                  <ul className="text-sm space-y-1 text-gray-400">
                    <li>• Unable to register</li>
                    <li>• Duplicate registration errors</li>
                    <li>• OTP not received</li>
                    <li>• Team details updates</li>
                  </ul>
                </div>

                {/* Payment Issues */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    <h3 className="font-bold text-white">Payment Issues</h3>
                  </div>
                  <ul className="text-sm space-y-1 text-gray-400">
                    <li>• Payment failed but debited</li>
                    <li>• Duplicate charges</li>
                    <li>• Refund status inquiries</li>
                    <li>• Payment receipt not received</li>
                  </ul>
                </div>

                {/* Account Issues */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-blue-500" />
                    <h3 className="font-bold text-white">Account Issues</h3>
                  </div>
                  <ul className="text-sm space-y-1 text-gray-400">
                    <li>• Login problems</li>
                    <li>• Password reset</li>
                    <li>• Account verification</li>
                    <li>• Email change requests</li>
                  </ul>
                </div>

                {/* Tournament Queries */}
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <HelpCircle className="w-5 h-5 text-purple-500" />
                    <h3 className="font-bold text-white">Tournament Queries</h3>
                  </div>
                  <ul className="text-sm space-y-1 text-gray-400">
                    <li>• Match schedules</li>
                    <li>• Rules clarification</li>
                    <li>• Prize distribution status</li>
                    <li>• Technical support</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Response Time */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-red-500">📅</span> Response Time
              </h2>
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold mt-1">•</span>
                    <span><strong>Urgent Issues</strong> (payment failures, login issues): <strong>12-24 hours</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 font-bold mt-1">•</span>
                    <span><strong>General Queries</strong> (rules, schedules): <strong>24-48 hours</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold mt-1">•</span>
                    <span><strong>Refund Status</strong>: <strong>48-72 hours</strong></span>
                  </li>
                </ul>
                <p className="mt-3 text-sm text-gray-400">
                  * Response times may be longer during tournament peak hours or weekends
                </p>
              </div>
            </section>

            {/* Business Hours */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-red-500">🕐</span> Support Hours
              </h2>
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <p className="mb-2"><strong>Email Support:</strong> 24/7 (emails accepted anytime)</p>
                <p className="mb-2"><strong>Response Hours:</strong> Monday - Sunday, 9:00 AM - 10:00 PM IST</p>
                <p className="text-sm text-gray-400 mt-3">
                  Emails sent outside business hours will be responded to on the next business day.
                </p>
              </div>
            </section>

            {/* Before Contacting */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Before You Contact Us</h2>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-300 mb-3">
                  <strong>Please check these first:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Read our <a href="/terms-and-conditions" className="text-blue-400 underline">Terms & Conditions</a></li>
                  <li>Check <a href="/refund-policy" className="text-blue-400 underline">Cancellation & Refund Policy</a></li>
                  <li>Review <a href="/privacy-policy" className="text-blue-400 underline">Privacy Policy</a></li>
                  <li>Look for emails in your spam/junk folder</li>
                  <li>Try logging out and logging back in for account issues</li>
                </ul>
              </div>
            </section>

            {/* Social Media */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Other Ways to Reach Us</h2>
              <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                <p className="mb-3">
                  <strong>Website:</strong>{' '}
                  <a 
                    href="https://strk-tournaments.vercel.app" 
                    className="text-blue-400 hover:text-blue-300 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://strk-tournaments.vercel.app
                  </a>
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Currently, email is our primary support channel. We're working on adding live chat and phone support soon!
                </p>
              </div>
            </section>

            {/* Emergency Contact */}
            <section className="mt-8 p-6 bg-red-500/10 border-2 border-red-500/30 rounded-lg">
              <h2 className="text-xl font-bold text-red-400 mb-3">🚨 Emergency Contact</h2>
              <p className="text-gray-300 mb-3">
                For <strong>urgent issues during live tournament matches</strong> (technical problems, server issues, cheating reports):
              </p>
              <p className="text-gray-300">
                Email us immediately at{' '}
                <a 
                  href="mailto:strk.tournaments@gmail.com?subject=URGENT%20-%20Live%20Match%20Issue" 
                  className="text-red-400 hover:text-red-300 underline font-bold"
                >
                  strk.tournaments@gmail.com
                </a>
                {' '}with subject line starting with <strong>"URGENT"</strong>
              </p>
            </section>

            {/* Final Note */}
            <section className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-center text-gray-300">
                <strong>Note:</strong> Please ensure your email is from the same address used for tournament registration. 
                Queries from unregistered emails may take longer to verify and respond to.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ContactUs
