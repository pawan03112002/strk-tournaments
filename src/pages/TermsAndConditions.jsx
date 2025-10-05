import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Shield, AlertTriangle, FileText, Users } from 'lucide-react'

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/register" 
          className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Registration
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Terms & Conditions</h1>
            <p className="text-gray-400">STRK Tournaments - Free Fire PC</p>
            <p className="text-sm text-gray-500 mt-2">Last Updated: October 5, 2025</p>
          </div>

          <div className="space-y-6 text-gray-300">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6 text-red-500" />
                1. Introduction
              </h2>
              <p className="leading-relaxed">
                Welcome to STRK Tournaments! By registering for and participating in our Free Fire PC tournaments, 
                you agree to comply with and be bound by the following terms and conditions. Please read these 
                carefully before registering.
              </p>
            </section>

            {/* Eligibility */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <Users className="w-6 h-6 text-red-500" />
                2. Eligibility
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All participants must be at least 16 years of age</li>
                <li>Only Gmail accounts (@gmail.com) are accepted for registration</li>
                <li>One account per person - duplicate registrations will be disqualified</li>
                <li>Each team must have exactly 4 players</li>
                <li>Teams must register with valid Free Fire IDs</li>
              </ul>
            </section>

            {/* Registration & Payment */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">3. Registration & Payment</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Registration Fee:</strong> ₹500 (INR) or $7 (USD)</li>
                <li>Payment must be completed to confirm registration</li>
                <li>Team numbers are assigned on a first-come, first-served basis</li>
                <li>Registration is non-transferable</li>
                <li><strong className="text-red-400">Refund Policy:</strong> No refunds after payment confirmation</li>
              </ul>
            </section>

            {/* Tournament Rules */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">4. Tournament Rules</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Teams must join the match lobby 15 minutes before scheduled time</li>
                <li>Late entries will result in disqualification</li>
                <li>Any form of cheating, hacking, or exploiting will lead to immediate ban</li>
                <li>Team leaders are responsible for their team members' conduct</li>
                <li>All decisions made by tournament organizers are final</li>
                <li>Players must use their registered Free Fire IDs only</li>
              </ul>
            </section>

            {/* Code of Conduct */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">5. Code of Conduct</h2>
              <p className="mb-3">Participants must:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintain respectful behavior towards other players and organizers</li>
                <li>Refrain from using offensive language or harassment</li>
                <li>Not engage in any form of cheating or unfair play</li>
                <li>Follow all instructions from tournament administrators</li>
                <li>Report any technical issues immediately</li>
              </ul>
              <div className="mt-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <p className="text-sm text-red-400">
                  Violation of the code of conduct may result in disqualification without refund.
                </p>
              </div>
            </section>

            {/* Prize Distribution */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">6. Prize Distribution</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Grand Prize:</strong> ₹10,00,000 | $12,000</li>
                <li>Winners will be announced immediately after the final match</li>
                <li>Prizes will be distributed within 7-14 business days</li>
                <li>Winners must provide valid payment details for prize transfer</li>
                <li>Applicable taxes are the responsibility of the winners</li>
              </ul>
            </section>

            {/* Privacy & Data */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">7. Privacy & Data Protection</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We collect only necessary information for tournament participation</li>
                <li>Your email and personal data will not be shared with third parties</li>
                <li>We use industry-standard encryption for payment processing</li>
                <li>You can request account deletion by contacting support</li>
              </ul>
            </section>

            {/* Liability */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">8. Limitation of Liability</h2>
              <p className="leading-relaxed">
                STRK Tournaments is not responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                <li>Technical issues on participant's end (internet, device failures)</li>
                <li>Game server issues beyond our control</li>
                <li>Loss of data or progress due to unforeseen circumstances</li>
                <li>Any disputes between team members</li>
              </ul>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">9. Changes to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to modify these terms at any time. Participants will be notified of 
                significant changes via email. Continued participation after changes indicates acceptance 
                of the new terms.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3">10. Contact Information</h2>
              <p className="leading-relaxed">
                For questions or concerns about these terms, please contact us:
              </p>
              <ul className="mt-2 space-y-1">
                <li><strong>Email:</strong> support@strktournaments.com</li>
                <li><strong>Discord:</strong> STRK Tournaments Official</li>
                <li><strong>WhatsApp:</strong> +91-XXXXX-XXXXX</li>
              </ul>
            </section>

            {/* Agreement */}
            <section className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-6 rounded-lg border border-red-500/30">
              <h2 className="text-xl font-bold text-white mb-3">Agreement</h2>
              <p className="text-sm leading-relaxed">
                By clicking "I Agree" during registration, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms and Conditions. You also confirm that all information 
                provided during registration is accurate and truthful.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <Link 
              to="/register" 
              className="btn-primary inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Registration
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default TermsAndConditions
