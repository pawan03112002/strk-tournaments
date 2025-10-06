import { motion } from 'framer-motion'
import { Package, Info, Mail } from 'lucide-react'

const ShippingPolicy = () => {
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-4">
              <Package className="w-8 h-8 text-purple-500" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Shipping Policy</h1>
            <p className="text-gray-400">Last updated: January 2025</p>
          </div>

          <div className="space-y-6 text-gray-300">
            {/* No Physical Shipping */}
            <section>
              <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-blue-400 mb-3">Digital Service - No Physical Shipping</h3>
                    <p className="text-gray-300">
                      STRK Tournaments is an <strong>online gaming tournament platform</strong>. We provide digital services only 
                      and do <strong>NOT ship any physical products</strong>. All tournament registrations, communications, 
                      and prize distributions are handled electronically.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Service Delivery */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">1.</span> Service Delivery
              </h2>
              <ul className="list-disc list-inside space-y-3 ml-4">
                <li>
                  <strong>Tournament Registration:</strong> Confirmation is sent instantly via email after successful payment
                </li>
                <li>
                  <strong>Team Number Assignment:</strong> Your unique team number is generated immediately upon registration
                </li>
                <li>
                  <strong>Match Schedules:</strong> Delivered via email and displayed on your dashboard
                </li>
                <li>
                  <strong>Game Links & Credentials:</strong> Sent via email 24-48 hours before matches
                </li>
              </ul>
            </section>

            {/* Prize Distribution */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">2.</span> Prize Distribution (Digital)
              </h2>
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg mb-4">
                <h3 className="text-lg font-bold text-green-400 mb-2">Cash Prizes</h3>
                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-300">
                  <li>Prizes are distributed <strong>digitally via bank transfer or UPI</strong></li>
                  <li>Winners must provide valid bank account details or UPI ID</li>
                  <li>Prize distribution timeline: <strong>30-60 days</strong> after tournament completion</li>
                  <li>Winners will be contacted via registered email for payment details</li>
                  <li>Applicable taxes (TDS) will be deducted as per Indian law for prizes above ₹10,000</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <p className="text-yellow-300">
                  <strong>Note:</strong> We do NOT send physical cheques, gift cards, or any physical items. 
                  All prizes are transferred electronically to ensure fast and secure delivery.
                </p>
              </div>
            </section>

            {/* Registration Fee Refunds */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">3.</span> Registration Fee Refunds
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Teams reaching <strong>Quarter Finals</strong> receive 100% registration fee refund</li>
                <li>Refunds are processed digitally to the original payment method</li>
                <li>Processing time: <strong>14-30 business days</strong> after tournament completion</li>
                <li>See our <a href="/refund-policy" className="text-blue-400 underline">Cancellation & Refund Policy</a> for complete details</li>
              </ul>
            </section>

            {/* Communication Delivery */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">4.</span> Digital Communication Delivery
              </h2>
              <p className="mb-3">All tournament-related communications are delivered via:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Email:</strong> Primary mode of communication for OTPs, confirmations, schedules, and announcements</li>
                <li><strong>Dashboard:</strong> Real-time updates available on your user dashboard</li>
                <li><strong>In-Platform Notifications:</strong> Important alerts displayed when you log in</li>
              </ul>
              
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-300">
                  <strong>Important:</strong> Ensure your Gmail is accessible and check spam/junk folders regularly. 
                  We are not responsible for missed communications due to invalid email addresses or spam filters.
                </p>
              </div>
            </section>

            {/* No Postal Address Required */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">5.</span> No Postal Address Required
              </h2>
              <p>
                Since we provide only digital services, we do <strong>NOT require or collect postal/shipping addresses</strong> 
                during registration. We only need:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Gmail address (for communication)</li>
                <li>Phone number (for contact purposes)</li>
                <li>Bank details / UPI ID (only if you win prizes)</li>
              </ul>
            </section>

            {/* Delivery Failures */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">6.</span> Communication Delivery Issues
              </h2>
              <p className="mb-3">If you don't receive tournament emails:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Check your <strong>spam/junk folder</strong></li>
                <li>Add <strong>strk.tournaments@gmail.com</strong> to your contacts</li>
                <li>Verify your email address in account settings</li>
                <li>Contact us immediately if issues persist</li>
              </ul>
            </section>

            {/* Geographic Availability */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-red-500">7.</span> Service Availability
              </h2>
              <p>
                STRK Tournaments is an online platform accessible <strong>worldwide</strong>. However:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Tournament participation may have regional restrictions (check tournament rules)</li>
                <li>Payment methods may vary by country (INR for India, USD for others)</li>
                <li>Prize distribution is primarily available for Indian bank accounts/UPI</li>
                <li>International winners may require additional verification for prize transfer</li>
              </ul>
            </section>

            {/* Contact */}
            <section className="mt-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-400" />
                Questions About Service Delivery?
              </h2>
              <p className="text-gray-300 mb-3">
                If you have questions about how our services are delivered or prize distribution:
              </p>
              <a 
                href="mailto:strk.tournaments@gmail.com" 
                className="text-blue-400 hover:text-blue-300 underline text-lg font-semibold"
              >
                strk.tournaments@gmail.com
              </a>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ShippingPolicy
