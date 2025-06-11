export class SignupPage {
  retrieveEmailVerificationLink(toAddress: string) {
    const serverId = Cypress.env("MAILOSAUR_SERVER_ID") as string;

    cy.task("getMailosaurMessage", {
      serverId,
      sentTo: toAddress,
    }).then((email: any) => {
      const parsedLinks = email.html?.links ?? [];

      let verificationLink: string | undefined = parsedLinks[0]?.href;

      if (!verificationLink) {
        const body = email.html?.body as string;
        console.log("Raw email HTML:", body);

        const rx = /https?:\/\/u[0-9]+\.ct\.sendgrid\.net\/ls\/click[^\s'"]+/;
        const match = body.match(rx);
        if (match) {
          verificationLink = match[0];
        }
      }

      if (!verificationLink) {
        throw new Error(
          `No verification link found for ${toAddress}. Parsed links: ${JSON.stringify(parsedLinks)}`
        );
      }

      cy.log(`Visiting verification link → ${verificationLink}`);
      cy.visit(verificationLink, { failOnStatusCode: false });
      cy.contains("Your email address is verified.").should("be.visible");
    });
  }
}
