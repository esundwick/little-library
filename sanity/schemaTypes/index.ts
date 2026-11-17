import blockContent from './blockContent'
import crewMember from './crewMember'
import castMember from './castMember'
import movie from './movie'
import person from './person'
import screening from './screening'
import borrow from './borrow'
import plotSummary from './plotSummary'
import plotSummaries from './plotSummaries'

export const schemaTypes = [
  // Document types
  movie,
  person,
  screening,
  borrow,
  // Other types
  blockContent,
  plotSummary,
  plotSummaries,
  castMember,
  crewMember,
]
