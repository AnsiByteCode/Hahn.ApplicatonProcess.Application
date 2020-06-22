namespace Hahn.ApplicatonProcess.May2020.Data.DbSets.Models
{
    /// <summary>
    /// Applicant Model
    /// </summary>
    public class Applicant
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        public int Id { get; set; }
        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>
        /// The name.
        /// </value>
        public string Name { get; set; }
        /// <summary>
        /// Gets or sets the name of the family.
        /// </summary>
        /// <value>
        /// The name of the family.
        /// </value>
        public string FamilyName { get; set; }
        /// <summary>
        /// Gets or sets the address.
        /// </summary>
        /// <value>
        /// The address.
        /// </value>
        public string Address { get; set; }
        /// <summary>
        /// Gets or sets the country of origin.
        /// </summary>
        /// <value>
        /// The country of origin.
        /// </value>
        public string CountryOfOrigin { get; set; }
        /// <summary>
        /// Gets or sets the email address.
        /// </summary>
        /// <value>
        /// The email address.
        /// </value>
        public string EmailAddress { get; set; }
        /// <summary>
        /// Gets or sets the age.
        /// </summary>
        /// <value>
        /// The age.
        /// </value>
        public int Age { get; set; }
        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="Applicant"/> is hired.
        /// </summary>
        /// <value>
        ///   <c>true</c> if hired; otherwise, <c>false</c>.
        /// </value>
        public bool Hired { get; set; }
    }
}
