import { motion } from 'framer-motion'
import { Shield, Mail, Eye, Lock, Database } from 'lucide-react'

const PrivacyPolicy = () => {
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
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-gray-400">Last updated: January 2025</p>
          </div>

          <div className="space-y-6 text-gray-300">
            {/* Introduction */}
            <section>
              <p className="text-lg">
                STRK Tournaments ("we", "us", "our") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you use our tournament platform.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <Database className="w-6 h-6 text-blue-500" />
                1. Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Personal Information:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email address (Gmail only)</li>
                <li>Username and display name</li>
                <li>Phone number and country code</li>
                <li>Free Fire game IDs</li>
                <li>Team information (team name, member details)</li>
                <li>Payment and transaction information</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-4 mb-2">Automatically Collected Information:</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Usage data and activity logs</li>
                <li>Cookies and tracking technologies</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <Eye className="w-6 h-6 text-green-500" />
                2. How We Use Your Information
              </h2>
              <p className="mb-3">We use collected information for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Tournament Operations:</strong> Registration, match scheduling, team management</li>
                <li><strong>Communication:</strong> Sending OTPs, match notifications, updates, and announcements</li>
                <li><strong>Payment Processing:</strong> Processing registration fees and prize disbursements</li>
                <li><strong>Account Management:</strong> Creating and maintaining user accounts</li>
                <li><strong>Anti-Fraud:</strong> Preventing cheating, duplicate registrations, and fraudulent activities</li>
                <li><strong>Analytics:</strong> Improving our platform, understanding user behavior</li>
                <li><strong>Marketing:</strong> Sending promotional emails about future tournaments (you can opt-out)</li>
                <li><strong>Legal Compliance:</strong> Meeting legal obligations and enforcing our terms</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">3.</span> Information Sharing & Disclosure
              </h2>
              <p className="mb-3">We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Payment Processors:</strong> Razorpay, Stripe (for payment processing)</li>
                <li><strong>Email Service:</strong> EmailJS (for sending OTPs and notifications)</li>
                <li><strong>Cloud Services:</strong> Firebase, Vercel (for hosting and database)</li>
                <li><strong>Tournament Partners:</strong> Sponsors and co-organizers (only with consent)</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                <li><strong>Public Display:</strong> Team names and usernames may be displayed publicly in leaderboards and match results</li>
              </ul>
              
              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-300">
                  <strong>Important:</strong> We do NOT sell your personal information to third parties. 
                  We only share data necessary for tournament operations and as described above.
                </p>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <Lock className="w-6 h-6 text-purple-500" />
                4. Data Security
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We use industry-standard encryption (SSL/TLS) to protect data in transit</li>
                <li>Firebase Authentication for secure user login</li>
                <li>Payment data is processed through PCI-DSS compliant providers (Razorpay/Stripe)</li>
                <li>Access to personal data is restricted to authorized personnel only</li>
                <li>Regular security audits and updates</li>
              </ul>
              <p className="mt-3 text-gray-400 italic">
                However, no method of transmission over the internet is 100% secure. 
                While we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">5.</span> Data Retention
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We retain your data for as long as your account is active</li>
                <li>Tournament-related data is retained for at least <strong>2 years</strong> for record-keeping</li>
                <li>Payment and transaction data is retained as required by law (typically 7 years)</li>
                <li>You can request account deletion by contacting us</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">6.</span> Your Rights
              </h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your account and data (subject to legal requirements)</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails</li>
                <li><strong>Data Portability:</strong> Request your data in a machine-readable format</li>
              </ul>
              <p className="mt-3 text-sm text-gray-400">
                To exercise these rights, contact us at <a href="mailto:strk.tournaments@gmail.com" className="text-blue-400 underline">strk.tournaments@gmail.com</a>
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">7.</span> Cookies & Tracking
              </h2>
              <p className="mb-2">We use cookies and similar technologies for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Authentication and session management</li>
                <li>Remembering your preferences</li>
                <li>Analytics and performance monitoring</li>
                <li>Security and fraud prevention</li>
              </ul>
              <p className="mt-3 text-gray-400">
                You can disable cookies in your browser, but this may affect website functionality.
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">8.</span> Children's Privacy
              </h2>
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-300">
                  Our services are <strong>NOT intended for children under 16 years</strong>. 
                  We do not knowingly collect personal information from children under 16. 
                  If we discover such data, we will delete it immediately.
                </p>
              </div>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">9.</span> Changes to Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page 
                with an updated "Last updated" date. Continued use of our services after changes constitutes 
                acceptance of the updated policy.
              </p>
            </section>

            {/* Contact */}
            <section className="mt-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" />
                Contact Us
              </h2>
              <p className="text-gray-300 mb-3">
                If you have questions about this Privacy Policy or how we handle your data:
              </p>
              <div className="space-y-2">
                <p className="text-white">
                  <strong>Email:</strong>{' '}
                  <a 
                    href="mailto:strk.tournaments@gmail.com" 
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    strk.tournaments@gmail.com
                  </a>
                </p>
                <p className="text-white">
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
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
