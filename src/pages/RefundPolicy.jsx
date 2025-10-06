import { motion } from 'framer-motion'
import { DollarSign, XCircle, AlertTriangle, Mail } from 'lucide-react'

const RefundPolicy = () => {
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Cancellation & Refund Policy</h1>
            <p className="text-gray-400">Last updated: January 2025</p>
          </div>

          <div className="space-y-6 text-gray-300">
            {/* No Refunds */}
            <section>
              <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-lg mb-4">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-red-400 mb-2">NO REFUND POLICY</h3>
                  <p className="text-red-300">
                    All tournament registration fees are <strong>NON-REFUNDABLE</strong> under any circumstances.
                  </p>
                </div>
              </div>
            </section>

            {/* General Policy */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">1.</span> General Refund Policy
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Once payment is completed, registration fees are <strong>NON-REFUNDABLE</strong></li>
                <li>No refunds will be issued for any reason including but not limited to:
                  <ul className="list-circle list-inside ml-6 mt-2 space-y-1 text-gray-400">
                    <li>Team disqualification due to rule violations</li>
                    <li>Player unavailability or team dissolution</li>
                    <li>Technical issues on player's end</li>
                    <li>Change of mind or scheduling conflicts</li>
                    <li>Tournament postponement or rescheduling</li>
                  </ul>
                </li>
                <li>Registration fees cover tournament organization, prize pool, and platform costs</li>
              </ul>
            </section>

            {/* Cancellation by Organizer */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">2.</span> Tournament Cancellation by Organizer
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>If STRK Tournaments cancels the entire tournament before it starts, <strong>full refunds will be processed</strong> within 7-14 business days</li>
                <li>If the tournament is canceled mid-event due to unforeseen circumstances:
                  <ul className="list-circle list-inside ml-6 mt-2 space-y-1 text-gray-400">
                    <li>Teams that reached Quarter Finals will receive full refund of registration fee</li>
                    <li>Other teams may receive partial refunds at organizer's discretion</li>
                  </ul>
                </li>
                <li>Refunds will be processed to the original payment method</li>
              </ul>
            </section>

            {/* No Cancellation by Players */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">3.</span> Cancellation by Registered Teams
              </h2>
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-yellow-300">
                      Teams <strong>CANNOT cancel</strong> their registration once payment is completed. 
                      Registration fees will <strong>NOT be refunded</strong> if:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-gray-400">
                      <li>Team decides not to participate after registration</li>
                      <li>Players are unavailable or drop out</li>
                      <li>Team fails to show up for scheduled matches</li>
                      <li>Team violates rules and gets disqualified</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Fee Refund for Quarter Finalists */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">4.</span> Registration Fee Refund Program
              </h2>
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-300 mb-2">
                  <strong>Special Benefit:</strong> Teams that reach the <strong>Quarter Finals</strong> stage will receive a 
                  <strong> 100% refund</strong> of their registration fee as a performance reward.
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1 text-gray-400">
                  <li>Refund will be processed after tournament completion</li>
                  <li>Refund timeline: 14-30 business days</li>
                  <li>Eligibility: Team must complete all Quarter Final matches</li>
                </ul>
              </div>
            </section>

            {/* Payment Issues */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">5.</span> Payment Failures & Duplicate Charges
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>If payment fails but amount is deducted, contact us within <strong>48 hours</strong> with transaction proof</li>
                <li>Duplicate charges will be refunded within 7-10 business days after verification</li>
                <li>We are not responsible for bank processing fees or currency conversion charges</li>
              </ul>
            </section>

            {/* Refund Process */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">6.</span> Refund Processing
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Approved refunds will be processed to the original payment method</li>
                <li>Processing time: 7-14 business days (may vary by payment provider)</li>
                <li>Refund requests must be submitted via email with transaction details</li>
                <li>All refund decisions are final and at the sole discretion of STRK Tournaments</li>
              </ul>
            </section>

            {/* Contact */}
            <section className="mt-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" />
                Contact for Refund Queries
              </h2>
              <p className="text-gray-300 mb-2">
                For any refund-related queries or payment issues, contact us:
              </p>
              <a 
                href="mailto:strk.tournaments@gmail.com" 
                className="text-blue-400 hover:text-blue-300 underline text-lg font-semibold"
              >
                strk.tournaments@gmail.com
              </a>
              <p className="text-gray-400 text-sm mt-2">
                Include your transaction ID and registered email in the subject line.
              </p>
            </section>

            {/* Agreement */}
            <section className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-300 text-sm">
                <strong>By completing payment, you acknowledge and accept this Cancellation & Refund Policy.</strong> 
                You understand that registration fees are non-refundable except in cases explicitly mentioned above.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RefundPolicy
