# ⚖️ How Weighted E-Voting Calculation Works in India

## The Core Legal Principle
Under Section 108 of the Companies Act 2013, e-voting follows the "Proportion Principle" — **one share = one vote** — unlike show of hands where every person gets one vote regardless of shareholding. This is the foundational rule the entire calculation engine must be built on. 

*   A shareholder with 10,000 shares has 10,000 votes.
*   A shareholder with 50 shares has 50 votes.

Their individual choices (For / Against / Abstain) are each multiplied by their share count.

---

## The Complete Calculation Flow

### Step 1 — Freeze the voter list at cut-off date
Shareholders holding shares either in physical form or in dematerialised form as on the record date are eligible to cast their vote electronically. Once the voting period ends, the portal must be immediately blocked.

The system must import a voter master list from the company's RTA (Registrar and Transfer Agent) containing:
`Voter ID | Name | Folio/Demat No. | Shares Held | Share Class | Voting Rights`

### Step 2 — Handle share classes separately
The scrutiniser's register must record the number of shares held by each voter, the nominal value of such shares, and whether the shares have differential voting rights.

India has two main share types the engine must handle:

| Share Class | Voting Rights | How to handle |
| :--- | :--- | :--- |
| **Equity shares (ordinary)** | 1 vote per share | Standard calculation |
| **Differential Voting Rights (DVR) shares** | Fraction of 1 vote per share (e.g. 1/10th) | Apply DVR multiplier |
| **Preference shares** | Zero vote on most resolutions | Exclude unless resolution affects their rights |

### Step 3 — Record each vote with weight
When a voter casts their vote, the system stores:
```json
{
  "voter_id": "IN1234567890",
  "resolution_id": "RES_001",
  "choice": "FOR",
  "shares_held": 10000,
  "dvr_multiplier": 1.0,
  "weighted_votes": 10000,
  "timestamp": "2026-03-28T10:45:22+05:30",
  "session_hash": "abc123..."
}
```

### Step 4 — Aggregate results per resolution
At the end of the voting period, the engine calculates:
```text
Total Valid Votes Cast    = Sum of all weighted votes (For + Against + Abstain)
Total Votes FOR           = Sum of weighted votes where choice = "FOR"
Total Votes AGAINST       = Sum of weighted votes where choice = "AGAINST"
Total Votes ABSTAIN       = Sum of weighted votes where choice = "ABSTAIN"

FOR %     = (Total Votes FOR / Total Valid Votes Cast) × 100
AGAINST % = (Total Votes AGAINST / Total Valid Votes Cast) × 100
```
> **Note:** Abstain votes are counted in participation but excluded from the FOR/AGAINST percentage calculation.

### Step 5 — Determine if resolution passes
India has two resolution thresholds:

| Resolution Type | Threshold to Pass | Examples |
| :--- | :--- | :--- |
| **Ordinary Resolution** | Simple majority — more than 50% of votes FOR | Director appointment, dividend approval |
| **Special Resolution** | At least 75% of votes FOR | MOA amendment, winding up, related party transactions |

---

## Real Example — Full Calculation
**Company:** ABC Ltd AGM 2026
**Total shares outstanding:** 1,00,00,000 (1 crore)
**Cut-off date voter list:** 8,500 shareholders
**Resolution 1:** Appointment of Independent Director (Ordinary Resolution)

| Voter | Shares | Choice | Weighted Votes |
| :--- | :--- | :--- | :--- |
| Promoter A | 40,00,000 | FOR | 40,00,000 |
| Institution B | 20,00,000 | FOR | 20,00,000 |
| Retail investor C | 500 | AGAINST | 500 |
| Retail investor D | 200 | ABSTAIN | 200 |
| *(remaining 8,496 shareholders)* | 39,99,300 | various | ... |

**Final tally:**
```text
Votes FOR       = 62,45,000  →  62.45%
Votes AGAINST   =  8,30,000  →   8.30%
Votes ABSTAIN   =  2,25,000  →  (excluded from %)
─────────────────────────────────────────
Valid votes     = 70,75,000 (FOR + AGAINST only)
FOR % of valid  = 62,45,000 / 70,75,000 = 88.27%

Result: PASSED ✅ (>50% threshold met)
```

---

## What the Platform Must Build — Technical Checklist

### Database schema:
*   `meetings` → company, date, record_date, voting_open, voting_close
*   `resolutions` → meeting_id, resolution_no, type (ordinary/special), text
*   `voter_master` → meeting_id, voter_id, name, folio_demat, shares, dvr_flag
*   `votes` → voter_id, resolution_id, choice, weighted_votes, timestamp, hash

### Calculation engine:
1.  **On vote submission:**
    *   Validate voter eligibility against `voter_master`
    *   Check cut-off date
    *   Check not already voted (one vote per resolution)
    *   Store `weighted_votes = shares × dvr_multiplier`
    *   Generate tamper-evident hash
2.  **On voting close:**
    *   Block portal immediately
    *   Run aggregation query per resolution
    *   Generate Scrutiniser report in PDF
    *   Send to Scrutiniser portal for certification
3.  **Scrutiniser report must contain:**
    *   Resolution-wise: FOR votes, AGAINST votes, ABSTAIN votes
    *   Percentage calculations
    *   Pass/Fail determination
    *   Total eligible votes vs votes cast (participation rate)
    *   List of invalid/rejected votes with reasons

---

## Special Cases the Engine Must Handle

1.  **Proxy voting:** A shareholder can authorise another person to vote on their behalf. System must accept proxy forms (Form MGT-11) and transfer share weight to the proxy voter.
2.  **Corporate shareholders (institutions):** When a company holds shares in another company, they vote through an authorised representative. System must allow institutional login with board resolution upload.
3.  **Joint holders:** Only the **first named holder** gets the vote — the system must enforce this.
4.  **Locked / pledged shares:** Shares pledged to a bank or under SEBI lock-in still carry voting rights with the registered shareholder — the RTA data feed must flag these.
5.  **Vote change not allowed:** Once the vote is cast, it cannot be changed. System must hard-block any modification.

---

## The Scrutiniser Report Format (BSE/NSE Submission)
The Scrutiniser must give their report within **3 days** from the conclusion of the meeting. The platform must auto-generate this report format required by stock exchanges:

```text
SCRUTINISER'S REPORT
Company: ABC Ltd | CIN: XXXXXXXXX | AGM Date: DD/MM/YYYY

Resolution 1: [Title]  |  Type: Ordinary

  Total shares eligible to vote      : 1,00,00,000
  Total votes cast (e-voting)        :   72,00,000
  Participation rate                 :       72.00%

  Votes in FAVOUR                    :   62,45,000  (86.74%)
  Votes AGAINST                      :    8,30,000  (11.53%)
  Votes ABSTAINED                    :    1,25,000
  Invalid votes                      :        None

  Result: RESOLUTION PASSED ✅

Certified by: [Scrutiniser Name], PCS, CP No. XXXXX
Date: DD/MM/YYYY   Signature: ___________
```
