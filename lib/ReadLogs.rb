class ReadLogs
  def read(filename)
    file_str = IO.read("#{Rails.root}/log/" + filename)
    formatted_str = file_str.gsub(/\n{2,5}/, "<br /> <br />")
    formatted_str = formatted_str.gsub(/\n{1,2}/, "<br />")
    div_str = %Q{
      <div> #{formatted_str} </div> }
  
    return div_str
  end
end