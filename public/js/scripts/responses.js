function getBotResponse(input) {
  if (input == 'how to become a donor') {
    return 'If you are 18+, you are eligible to become a donor. You will have to fill the organ donation form and register to become a donor Type yes to proceed '
  } else if (input == 'yes' || input == 'Yes') {
    window.location.href = 'donorcard.html'
  } else if (input == 'i want to file a complaint') {
    window.location.href = 'complaint.html'
  } else if (input == 'info on organ donation') {
    window.location.href = 'awareness.html'
  } else if (input == 'how can i follow up with the website trends') {
    location.href =
      'https://www.instagram.com/invites/contact/?i=x02b45xkcpmk&utm_content=3sxycga'
  } else if (input == 'which organs can be donated') {
    return 'eye, skin, heart, lungs, liver, pancreas and kidneys can be donated'
  } else if (input == 'what is brain death') {
    return "The brain death can be caused due to major accident which causes severe brain injury, a major stroke or certain brain tumors.For a diagnosis of brain death: a person must be unconscious and fail to respond to outside stimulation. a person's heartbeat and breathing can only be maintained using a ventilator. there must be clear evidence that serious brain damage has occurred and it cannot be cured.Brain Dead people can donate their organs."
  } else if (input == 'nearby hospital' || input == 'hospital') {
    window.location.href = '/hospsearch.html'
  }
  if (input == 'hello') {
    // Simple responses
    return 'Hello there!'
  } else if (input == 'goodbye') {
    return 'Talk to you later!'
  } else {
    return 'Try asking something else!'
  }
}
