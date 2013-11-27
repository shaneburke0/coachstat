class ReadLogs
  def read(filename)
    file_str = IO.read("#{Rails.root}/log/" + filename)
    formatted_str = file_str..gsub(/[\n]+/, "<br />")
    div_str = %Q{
      <div><p> #{formatted_str} </p></div> }
  
    return div_str
  end
end